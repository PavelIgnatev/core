export class SpeechController {
  constructor(
    storage,
    figuresController,
    themeController,
    colorController,
    onUnsupported,
  ) {
    this.storage = storage;
    this.figuresController = figuresController;
    this.themeController = themeController;
    this.colorController = colorController;
    this.onUnsupported = onUnsupported;
    this.isListening = false;
    this.control = document.getElementById("speech");

    if (!this.control) {
      throw new Error("Speech control button not found");
    }

    this.initializeSpeechRecognition();
  }

  initializeSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;

    if (!SpeechRecognition || !SpeechGrammarList) {
      this.onUnsupported("SpeechRecognition");
      return;
    }

    // Создаем распознаватель речи
    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'en-US';
    this.recognition.continuous = false;
    this.recognition.interimResults = false;

    // Создаем грамматику для распознавания
    const shapes = 'circle | rectangle | square | triangle';
    const colors = 'red | blue | green | yellow | pink | orange';
    const themes = 'light | dark | system';
    const commands = `add ${shapes} | theme ${themes} | color ${colors} | delete last`;
    const grammar = `#JSGF V1.0; grammar commands; public <command> = ${commands};`;

    const speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    this.recognition.grammars = speechRecognitionList;

    // Обработка результатов распознавания
    this.recognition.onresult = (event) => {
      const command = event.results[0][0].transcript.trim().toLowerCase();
      this.processCommand(command);
    };

    this.recognition.onend = () => {
      if (this.isListening) {
        this.recognition.start();
      } else {
        this.control.classList.remove("control-button-speech__enabled");
      }
    };

    this.control.addEventListener("click", () => {
      if (this.isListening) {
        this.isListening = false;
        this.recognition.stop();
        this.control.classList.remove("control-button-speech__enabled");
      } else {
        this.isListening = true;
        this.recognition.start();
        this.control.classList.add("control-button-speech__enabled");
      }
    });
  }

  processCommand(command) {
    console.log('Received command:', command);

    if (command.startsWith('add ')) {
      const shape = command.substring(4).trim();
      if (['circle', 'rectangle', 'square', 'triangle'].includes(shape)) {
        this.figuresController.addShape(shape, this.storage.read("selectedColor"));
      }
    } else if (command.startsWith('theme ')) {
      const theme = command.substring(6).trim();
      if (['light', 'dark', 'system'].includes(theme)) {
        this.themeController.setTheme(theme);
      }
    } else if (command.startsWith('color ')) {
      const color = command.substring(6).trim();
      if (['red', 'blue', 'green', 'yellow', 'pink', 'orange'].includes(color)) {
        this.colorController.setColor(`#${this.getColorHex(color)}`);
      }
    } else if (command === 'delete last') {
      this.figuresController.deleteLastShape();
    }
  }

  getColorHex(colorName) {
    const colorMap = {
      'red': 'ff0000',
      'blue': '0000ff',
      'green': '008000',
      'yellow': 'ffff00',
      'pink': 'ffc0cb',
      'orange': 'ffa500'
    };
    return colorMap[colorName] || 'ff0000';
  }
}

// Улучшенная функция для генерации UUID без использования crypto API
function generateUUID() {
  let timestamp = new Date().getTime();
  let performanceNow = typeof window !== 'undefined' && window.performance && typeof window.performance.now === 'function' ? window.performance.now() : 0;

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    // Используем timestamp и performanceNow для более случайной генерации
    let random = Math.random() * 16;
    if (timestamp > 0) {
      random = (timestamp + random) % 16 | 0;
      timestamp = Math.floor(timestamp / 16);
    } else {
      random = (performanceNow + random) % 16 | 0;
      performanceNow = Math.floor(performanceNow / 16);
    }
    return (c === 'x' ? random : (random & 0x3 | 0x8)).toString(16);
  });
}

export class GameState {
  constructor(storage) {
    this.storage = storage;
    this.channel = new BroadcastChannel('tab-sync');
    this.tabId = generateUUID(); // Используем собственную функцию вместо crypto.randomUUID()
    this.isMainTab = false;
    this.lastUpdateTime = Date.now();

    // При создании новой вкладки, если нет других вкладок, стать главной
    this.becomeMainTab();

    // Запрос на получение текущего состояния от других вкладок
    this.channel.postMessage({
      type: 'request_state',
      tabId: this.tabId,
      timestamp: Date.now()
    });

    // Обработка сообщений от других вкладок
    this.channel.onmessage = (event) => {
      const message = event.data;

      switch(message.type) {
        case 'tab_state_change':
          // Если другая вкладка стала основной, стать вспомогательной
          if (message.isMainTab && message.tabId !== this.tabId) {
            this.isMainTab = false;
          }
          break;

        case 'request_state':
          // Отправить текущее состояние запрашивающей вкладке
          if (this.isMainTab) {
            this.channel.postMessage({
              type: 'state_update',
              store: this.storage.getAll(),
              tabId: this.tabId,
              isMainTab: this.isMainTab,
              timestamp: Date.now()
            });
          }
          break;

        case 'state_update':
          // Обновить состояние, если сообщение новее последнего обновления
          if (message.timestamp > this.lastUpdateTime) {
            this.storage.setAll(message.store);
            this.lastUpdateTime = message.timestamp;
          }
          break;
      }
    };

    // Обработка закрытия вкладки
    window.addEventListener('beforeunload', () => {
      if (this.isMainTab) {
        this.channel.postMessage({
          type: 'main_tab_closed',
          timestamp: Date.now()
        });
      }
    });

    // Если главная вкладка закрылась, следующая вкладка становится главной
    this.channel.addEventListener('message', (event) => {
      if (event.data.type === 'main_tab_closed') {
        // Небольшая задержка, чтобы избежать гонки
        setTimeout(() => {
          this.becomeMainTab();
        }, 100);
      }
    });
  }

  becomeMainTab() {
    this.isMainTab = true;
    this.lastUpdateTime = Date.now();
    
    // Сообщить другим вкладкам о смене статуса
    this.channel.postMessage({
      type: 'tab_state_change',
      tabId: this.tabId,
      isMainTab: true,
      timestamp: this.lastUpdateTime
    });
  }

  becomeSecondaryTab() {
    this.isMainTab = false;
    this.lastUpdateTime = Date.now();
    
    // Сообщить другим вкладкам о смене статуса
    this.channel.postMessage({
      type: 'tab_state_change',
      tabId: this.tabId,
      isMainTab: false,
      timestamp: this.lastUpdateTime
    });
  }

  isMain() {
    return this.isMainTab;
  }

  updateState(store) {
    // Отправить обновленное состояние другим вкладкам
    if (this.isMainTab) {
      this.lastUpdateTime = Date.now();
      this.channel.postMessage({
        type: 'state_update',
        store: store,
        tabId: this.tabId,
        isMainTab: this.isMainTab,
        timestamp: this.lastUpdateTime
      });
    }
  }
}
