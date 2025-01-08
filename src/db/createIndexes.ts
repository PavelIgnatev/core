import { DB } from './db';

export const createSeparateIndexes = async () => {
  console.log('Creating separate indexes...');
  const db = await DB();
  const dialoguesCollection = db.collection('dialogues');
  
  try {
    await dialoguesCollection.createIndexes([
      {
        key: { accountId: 1, recipientId: 1 },
        name: 'dialogues_account_recipient',
        background: true,
      },
      {
        key: { recipientId: 1, groupId: 1 },
        name: 'dialogues_recipient_group',
        background: true,
      },
      {
        key: { 
          accountId: 1,
          step: 1,
          ping: 1,
          stopped: 1,
          blocked: 1,
          dateUpdated: -1,
          dateCreated: -1
        },
        name: 'dialogues_status_dates',
        background: true,
      },
      {
        key: { 
          accountId: 1,
          automaticReason: 1,
          dateUpdated: -1
        },
        name: 'dialogues_blocked',
        background: true,
      }
    ]);
    
    console.log('✅ Separate indexes created successfully');
  } catch (error) {
    console.error('❌ Error creating separate indexes:', error);
    throw error;
  }
};

export const createCombinedIndex = async () => {
  console.log('Creating combined index...');
  const db = await DB();
  const dialoguesCollection = db.collection('dialogues');
  
  try {
    await dialoguesCollection.createIndex(
      { 
        accountId: 1,
        recipientId: 1,
        groupId: 1,
        step: 1,
        ping: 1,
        stopped: 1,
        blocked: 1,
        automaticReason: 1,
        dateUpdated: -1,
        dateCreated: -1
      },
      {
        name: 'dialogues_combined',
        background: true,
      }
    );
    
    console.log('✅ Combined index created successfully');
  } catch (error) {
    console.error('❌ Error creating combined index:', error);
    throw error;
  }
};

// Пример использования:
if (require.main === module) {
  // Выберите один из вариантов:
  createSeparateIndexes()  // Отдельные индексы
  // createCombinedIndex() // Комбинированный индекс
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Failed to create indexes:', error);
      process.exit(1);
    });
} 