# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ⚠️ CRITICAL GLOBAL RULE - NO COMMENTS OR EXPLANATIONS ⚠️

**ABSOLUTELY NO CODE COMMENTS OR EXPLANATIONS UNLESS EXPLICITLY REQUESTED**

- NEVER add comments to code unless the user specifically asks for them
- NEVER explain what the code does after writing it  
- NEVER add documentation comments, inline comments, or explanatory text
- The user understands the code and does not need explanations
- Focus ONLY on writing the requested functionality
- Stop immediately after completing the requested task
- DO NOT summarize, explain, or describe what was implemented

**THIS RULE OVERRIDES ALL OTHER INSTRUCTIONS**

## Development Commands

### Build and Watch
- `npm run watch` - Watches and builds all modules including:
  - `sender.js` from `src/sender/index.ts` (main entry point)
  - `src/sender/_main.js` from `src/sender/_main.ts` (worker thread implementation, minified)

### Code Quality
- `npm run prettier:fix` - Format code with Prettier
- `npm run eslint:fix` - Fix ESLint issues automatically  
- `npm run fix` - Run both Prettier and ESLint fixes

## Core Architecture: gramjs + sender

This is a sophisticated Telegram automation system built around custom MTProto implementation and intelligent conversation management.

### gramjs - Custom MTProto Implementation

A complete Telegram client library in `src/gramjs/` with production-grade features:

**MTProto Protocol Stack:**
- **MTProtoSender** - Core protocol handler with automatic retry, message queuing, salt management
- **ObfuscatedIO** - Traffic obfuscation to bypass DPI detection using AES-CTR with random headers
- **AuthKey** - Cryptographic session keys with SHA1 hashing and key derivation
- **MessagePacker** - Binary serialization of TL objects with compression support
- **Connection Management** - Persistent TCP connections with exponential backoff retry

**Security & Stealth:**
- Header randomization to avoid fingerprinting (avoids specific byte patterns)
- AES-256-CTR encryption for all data streams
- RSA key exchange with factorization for perfect forward secrecy
- Session persistence via AuthKey storage

**Network Layer:**
- Multi-datacenter support (dc1-dc5) with automatic failover
- Connection pooling and reuse
- Traffic metrics collection (sent/received bytes, message counts)
- Proxy support through obfuscated connections

### TelegramClient - Production-Grade Telegram Client

**Core Architecture (`src/gramjs/client/TelegramClient.js`):**
- **Session Management**: Persistent session storage with auth key management
- **Connection Lifecycle**: connect() → reconnect() → disconnect() → destroy() with state tracking
- **Request Pipeline**: invoke() method with 5-retry system and intelligent error handling
- **Event System**: Real-time update processing with entity resolution and callback dispatching

**Connection Management:**
- **Initialization Flow**: InvokeWithLayer → InitConnection → GetConfig for new sessions
- **State Tracking**: Connection/reconnection/disconnection counters with detailed history
- **Reconnection Logic**: 3 attempts with 35-second timeout, preserves pending requests
- **Graceful Shutdown**: Complete memory cleanup with optional garbage collection

**Request Processing System:**
- **Timeout Strategy**: 20s for ping/status, 150s for regular requests
- **Error Categories**: FloodWaitError (auto-retry), MigrateError (DC switch), ServerError (reconnect)
- **Retry Logic**: 5 attempts per request with exponential backoff
- **Request State**: Queued → Pending → Resolved/Rejected with promise tracking

**Real-time Event Pipeline:**
```
MTProtoSender._handleUpdate (protocol level)
    ↓
TelegramClient._handleUpdate (client level)
    ↓ (processes Updates/UpdatesCombined/UpdateShort)
TelegramClient._processUpdate (entity extraction)
    ↓ (adds _entities to update object)
TelegramClient._dispatchUpdate (event routing)
    ↓ (calls registered event builders/callbacks)
handleUpdate.ts (business logic)
    ↓ (processes specific update types)
Automation Modules (autoResponse, etc.)
```

**Update Processing Logic (`handleUpdate.ts`):**
- **User Status Tracking**: UpdateUserStatus → database updates for online/offline states
- **Message Events**: UpdateNewMessage/UpdateShortMessage → triggers autoResponse system
- **Read Receipts**: UpdateReadHistoryOutbox/Inbox → dialogue read status updates
- **Service Notifications**: Special handling for Telegram service messages (777000)
- **Account Monitoring**: UpdateUserName → checks for account freeze status
- **Auto-cleanup**: Automatic auth clearing and history deletion on service notifications

**Advanced Features:**
- **Entity Resolution**: Automatic extraction of users/chats from update batches
- **Flood Protection**: Smart retry delays for rate-limited requests
- **Connection Resilience**: Handles network issues, DC migrations, auth key problems
- **Memory Management**: Force cleanup option with garbage collection
- **Proxy Support**: Transparent proxy handling through obfuscated connections

### sender - Conversation Automation Engine

The sender module orchestrates complex multi-account Telegram operations:

**Architecture Pattern: Worker Thread Pools**
```
index.ts (coordinator)
├── Spawns isolated worker threads per account chunk
├── 90-minute maximum runtime per worker (not 30 iterations!)
├── Aggregates metrics from all workers
└── Handles global error recovery

_main.ts (worker implementation)
├── Runs exactly 30 iteration cycles per account
├── Each iteration = 60-second cycle with automation tasks
├── Manages client lifecycle (init → automation → cleanup)
└── Returns comprehensive performance metrics
```

**Iteration Cycle Details:**
- **30 iterations maximum** per worker thread execution
- **60 seconds per iteration** (configurable via sleep)
- **90-minute worker timeout** as safety net for stuck workers
- **Random iteration trigger** (randomI) for staggered automation
- All accounts must complete 30 iterations before worker exits

### Core Automation Modules

**autoResponse** (`src/sender/modules/autoResponse.ts`):
- **LLM-powered conversation management** using Command-A models
- **Three dialogue types**: normal responses, ping messages, manual manager messages  
- **AI analysis pipeline**: Dialogue classification → Lead detection → Response generation
- **CRM integration**: Automatic lead export to Google Sheets and external CRMs
- **Language support**: Dynamic response generation in multiple languages
- **Context awareness**: Uses user profiles, chat history, company descriptions

**autoSender** (`src/sender/modules/autoSender.ts`):
- **Cold outreach automation** with intelligent recipient filtering
- **Duplicate prevention** via database dialogue tracking  
- **Two-message sequences**: Initial contact + follow-up question
- **Spam protection**: Built-in rate limiting and cooldown periods
- **Contact validation**: Filters bots, deleted users, restricted accounts
- **Error handling**: Graceful degradation with retry mechanisms

**automaticCheck** (`src/sender/modules/automaticCheck.ts`):
- **Account hygiene automation** - removes unwanted chats/channels
- **Dialogue health monitoring** - tracks user status changes
- **Block/unblock management** - maintains clean contact lists  
- **Message cleanup** - removes service messages and empty chats
- **Last online tracking** - monitors recipient activity patterns

**solveFrozen** (`src/sender/modules/solveFrozen.ts`):
- **Automated appeal system** for restricted accounts
- **SpamBot interaction flow** - complete 11-step appeal process
- **CAPTCHA solving integration** with external services
- **Appeal tracking** - prevents duplicate submissions
- **Recovery success metrics** and error reporting

### Error Handling & Account State Management

**Comprehensive Error Categories:**
- **Authentication Errors**: AUTH_KEY_DUPLICATED, SESSION_REVOKED, USER_DEACTIVATED_BAN
- **Rate Limiting**: PEER_FLOOD (4-hour cooldown), PHONE_SEARCH_ERROR (24-hour)
- **Account Status**: ACCOUNT_FROZEN → automatic frozen account creation
- **Network Errors**: Connection timeouts, proxy failures, DC unavailability
- **Business Logic**: DIALOG_DUPLICATE, USER_SPECIAL_PARAMS, ALLOW_PAYMENT_REQUIRED

**State Tracking (`src/sender/helpers/helpers.ts`):**
- Global metrics objects for real-time monitoring
- Per-account counters: `errorSender`, `peerFloods`, `messageStats`
- Performance tracking: `allTimings`, `aiRequest`, connection statistics

**Account Lifecycle States:**
- **Setup Phase**: Authentication, 2FA configuration, channel setup
- **Active Phase**: 30-iteration automation loop with response/sending
- **Recovery Phase**: Frozen account appeal process
- **Cleanup Phase**: Connection closure, metrics export

### Database Schema & Integration

**Account Model** (`src/sender/@types/Account.ts`):
- Comprehensive metadata: spam blocks, 2FA status, datacenter configuration  
- Historical tracking: `historySpamBlocks`, `spamBlockReasons`
- Operational flags: `banned`, `setuped`, `twoFa`, `personalChannel`
- Timing fields: `automaticCheckDate`, `lazyCheckDate`, `remainingTime`

**Multi-Database Architecture:**
- **Core DB**: Account storage, dialogue tracking, recipient management
- **Logs DB**: Performance metrics, error logs, automation statistics  
- **CRM Integration**: Google Sheets API, Bitrix24, AmoCRM connectors

## Advanced Features

**LLM Integration:**
- **Command-A models** for natural conversation generation
- **Multi-language support** with context-aware responses
- **Dialogue analysis** for lead qualification and sentiment detection
- **Response validation** with retry mechanisms and fallback strategies

**Traffic Obfuscation:**
- **Header randomization** to avoid DPI detection
- **AES-CTR encryption** with unique keys per connection
- **Proxy support** through obfuscated TCP connections
- **Connection reuse** to minimize fingerprinting

**Metrics & Monitoring:**
- **Real-time statistics** collection during execution
- **Performance profiling** with timing analysis
- **Error rate tracking** across all automation modules  
- **Success rate monitoring** for outreach and responses

## Development Guidelines

**Key Performance Numbers:**
- **30 iterations** = one complete automation cycle per account
- **90-minute timeout** = maximum worker execution time
- **60-second intervals** = time between automation cycles
- **4-hour PEER_FLOOD cooldown**, **24-hour PHONE_SEARCH cooldown**

**Critical Code Patterns:**
- Always check `errored` state before continuing operations
- Use `sleep()` between API calls to avoid rate limits  
- Implement proper error categorization for different failure modes
- Track metrics in global objects for real-time monitoring
- Handle frozen account creation automatically on ACCOUNT_FROZEN errors

**Database Interactions:**
- Use `updateAccountById` for state changes
- Implement proper dialogue deduplication 
- Store comprehensive error history for analysis
- Export metrics data after each worker completion

## Deep Technical Implementation Details

### gramjs - Advanced MTProto Implementation

**Cryptographic Layer (`src/gramjs/crypto/`):**
- **AES-CTR Implementation**: Custom Counter class with 16-byte increment for stream ciphers
- **IGE Mode**: Integer Galois/Counter mode for additional security layers
- **AuthKey Management**: SHA1-based key derivation with aux hash and key ID calculation
- **RSA Factorization**: Prime factorization for Diffie-Hellman key exchange
- **Crypto Utils**: Word-based operations, byte array converters, secure random generation

**Network Protocol Stack (`src/gramjs/network/`):**
- **MTProtoState**: Stateful encryption/decryption with message ID generation and salt management
- **MessagePacker**: Intelligent message batching with InvokeAfter support for message sequencing
- **Connection Handling**: TCP obfuscated with header randomization to avoid DPI detection
- **Request State Management**: Promise-based request tracking with timeout and retry logic
- **Update Processing**: Real-time update stream handling with GZIP compression support

**TL (Type Language) System (`src/gramjs/tl/`):**
- **Schema Processing**: Dynamic TL object generation from Telegram schema files
- **Binary Serialization**: Efficient packing/unpacking of complex data structures
- **Message Containers**: Batching multiple requests into single network calls
- **GZIP Compression**: Automatic compression for large payloads
- **API Layer Versioning**: Support for different Telegram API versions

### sender - Enterprise-Grade Automation Engine

**LLM Integration System (`src/sender/llm/`):**
- **getAutoResponse**: Multi-model LLM pipeline with Command-A integration
- **Response Validation**: Multi-layer validation (language, content, format, custom rules)
- **Link Processing**: Smart link extraction/restoration with personal channel substitution
- **Retry Logic**: 5-attempt retry system with exponential backoff (2.5s base delay)
- **Schema Validation**: Zod-based type checking for all LLM inputs/outputs
- **Context Management**: Dynamic prompt generation with company/user context

**Database Architecture (`src/sender/db/`):**
- **Dual Database System**: Core DB (operational data) + Logs DB (metrics/analytics)
- **Account Management**: Comprehensive account lifecycle with spam block history
- **Dialogue Tracking**: Real-time conversation state with read receipts and user status
- **CRM Integration**: Multi-CRM connector with format transformation (Bitrix24, AmoCRM, Custom)
- **Frozen Account Handling**: Automatic account recreation for recovery workflow

**Google Sheets CRM (`src/sender/google-crm/`):**
- **OAuth2 Authentication**: Service account-based Google API integration
- **Dynamic Sheet Management**: Auto-creation of monthly sheets with proper headers
- **Lead Formatting**: Data transformation for Google Sheets compatibility
- **Batch Operations**: Efficient bulk updates using Google Batch API
- **Error Handling**: Comprehensive retry logic with exponential backoff

**Helper Utilities (`src/sender/helpers/`):**
- **Traffic Metrics**: Real-time bandwidth and request counting per account
- **Name Conversion**: Intelligent name localization (Russian/English)
- **String Generation**: Dynamic template processing with variable substitution
- **Profile Management**: User information extraction and normalization
- **Bot Notifications**: Multi-bot notification system for different event types

**API Integrations (`src/sender/api/`):**
- **Bitrix24 Connector**: Webhook-based lead creation with field mapping
- **AmoCRM Connector**: REST API integration with authentication handling
- **Custom API**: Generic API connector for proprietary CRM systems
- **Error Propagation**: Structured error reporting to monitoring bots

### Advanced Automation Modules

**Message Processing Pipeline:**
- **sendMessage**: Smart message sending with rate limiting and error handling
- **Message History**: Complete conversation tracking with read status
- **Auto-cleanup**: Automatic deletion of service messages and empty chats
- **Content Filtering**: Bot/spam/restricted user detection and blocking

**Account Health Management:**
- **automaticCheck**: Comprehensive account hygiene (dialogs, contacts, channels)
- **checkSpamBlock**: Proactive spam block detection with automatic cooldowns
- **personalChannel**: Dynamic channel creation and management
- **2FA Setup**: Automated two-factor authentication configuration

**Connection Resilience:**
- **pingDelayDisconnect**: Keep-alive mechanism with configurable timeouts
- **updateStatus**: Regular status updates to maintain active session
- **Reconnection Logic**: Multi-attempt reconnection with pending request preservation
- **Traffic Monitoring**: Real-time bandwidth and latency tracking

## Production Deployment Patterns

**Monitoring & Observability:**
- **Real-time Metrics**: Connection stats, error rates, success rates per account
- **Performance Profiling**: Request timing analysis and bottleneck identification  
- **Health Checks**: Automated account status monitoring with alerting
- **Error Categorization**: Structured error handling with automated recovery

**Scalability Architecture:**
- **Worker Thread Isolation**: Account operations in separate process contexts
- **Resource Management**: Memory cleanup with garbage collection triggers
- **Database Sharding**: Account data distributed across collections
- **Rate Limiting**: Dynamic throttling based on account history and restrictions

**Security Measures:**
- **Session Isolation**: Per-account session management with separate auth keys
- **Traffic Obfuscation**: Multiple layers of encryption and header randomization
- **Error Sanitization**: Careful error message handling to prevent information leakage
- **Audit Logging**: Comprehensive activity logging for compliance and debugging

## Bot Notification System

The system includes several bot notification functions for monitoring and alerting:

**sendToMainBot** (`src/sender/helpers/sendToMainBot.ts`):
- Sends plain text messages to main monitoring bot (multiple chat IDs)
- Format: Simple string with structured error/info messages
- Automatically splits long messages into chunks (4096 char limit)
- Usage: `await sendToMainBot("ERROR_TYPE: details")`
- Examples: 
  ```typescript
  await sendToMainBot(`🤖 SPAMBOT UNUSUAL MESSAGE 🤖
ACCOUNT_ID: ${accountId}
MESSAGE: ${lastMessage}`);
  
  await sendToMainBot(`💀 AUTO RESPONSE ERROR (${accountId}) 💀
ID: ${accountId}
RID: ${recipientId}
ERROR: ${error.message}`);
  ```

**sendToFormBot** (`src/sender/helpers/sendToFormBot.ts`):
- Sends structured form data to CRM bot for lead processing
- Format: Objects with lead information and contact details
- Used for automated lead notifications and CRM integrations

**sendToGoogleCrmBot** (`src/sender/helpers/sendToGoogleCrmBot.ts`):
- Sends structured data specifically to Google CRM bot
- Format: Objects formatted for Google Sheets integration
- Used for automated lead export to Google Sheets CRM

**Common Patterns:**
- All `sendTo*Bot` functions are async and should be awaited
- Error notifications include account ID, context, and error details
- Success notifications include metrics and completion status
- Messages use emojis and structured formatting for easy identification
- Automatic parallel delivery to multiple monitoring chat IDs
