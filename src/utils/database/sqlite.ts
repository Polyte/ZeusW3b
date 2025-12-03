/**
 * Browser Database Utility using IndexedDB
 * Provides local browser-based database functionality with a SQL-like interface
 */

const DB_NAME = 'ZeusLabsDB';
const DB_VERSION = 1;
let db: IDBDatabase | null = null;
let initPromise: Promise<void> | null = null;

// Table/Store names
const STORES = {
  BLOG_POSTS: 'blog_posts',
  CONTACT_MESSAGES: 'contact_messages',
  NEWSLETTER_SUBSCRIPTIONS: 'newsletter_subscriptions',
  SERVICE_REQUESTS: 'service_requests',
  CHAT_SESSIONS: 'chat_sessions',
  CHAT_MESSAGES: 'chat_messages',
  PROJECTS: 'projects',
};

/**
 * Initialize the IndexedDB database
 */
export async function initDatabase(): Promise<void> {
  if (initPromise) {
    return initPromise;
  }

  initPromise = new Promise((resolve, reject) => {
    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        console.error('❌ Database initialization failed:', request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        db = request.result;
        console.log('✅ Database initialized successfully');
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const database = (event.target as IDBOpenDBRequest).result;

        // Blog Posts store
        if (!database.objectStoreNames.contains(STORES.BLOG_POSTS)) {
          const blogStore = database.createObjectStore(STORES.BLOG_POSTS, {
            keyPath: 'id',
            autoIncrement: true,
          });
          blogStore.createIndex('category', 'category', { unique: false });
          blogStore.createIndex('published_date', 'published_date', { unique: false });
        }

        // Contact Messages store
        if (!database.objectStoreNames.contains(STORES.CONTACT_MESSAGES)) {
          const contactStore = database.createObjectStore(STORES.CONTACT_MESSAGES, {
            keyPath: 'id',
            autoIncrement: true,
          });
          contactStore.createIndex('status', 'status', { unique: false });
          contactStore.createIndex('created_at', 'created_at', { unique: false });
        }

        // Newsletter Subscriptions store
        if (!database.objectStoreNames.contains(STORES.NEWSLETTER_SUBSCRIPTIONS)) {
          const newsletterStore = database.createObjectStore(STORES.NEWSLETTER_SUBSCRIPTIONS, {
            keyPath: 'id',
            autoIncrement: true,
          });
          newsletterStore.createIndex('email', 'email', { unique: true });
          newsletterStore.createIndex('status', 'status', { unique: false });
        }

        // Service Requests store
        if (!database.objectStoreNames.contains(STORES.SERVICE_REQUESTS)) {
          const serviceStore = database.createObjectStore(STORES.SERVICE_REQUESTS, {
            keyPath: 'id',
            autoIncrement: true,
          });
          serviceStore.createIndex('status', 'status', { unique: false });
          serviceStore.createIndex('service_type', 'service_type', { unique: false });
          serviceStore.createIndex('created_at', 'created_at', { unique: false });
        }

        // Chat Sessions store
        if (!database.objectStoreNames.contains(STORES.CHAT_SESSIONS)) {
          const chatSessionStore = database.createObjectStore(STORES.CHAT_SESSIONS, {
            keyPath: 'id',
            autoIncrement: true,
          });
          chatSessionStore.createIndex('status', 'status', { unique: false });
          chatSessionStore.createIndex('created_at', 'created_at', { unique: false });
        }

        // Chat Messages store
        if (!database.objectStoreNames.contains(STORES.CHAT_MESSAGES)) {
          const chatMessagesStore = database.createObjectStore(STORES.CHAT_MESSAGES, {
            keyPath: 'id',
            autoIncrement: true,
          });
          chatMessagesStore.createIndex('chat_id', 'chat_id', { unique: false });
          chatMessagesStore.createIndex('created_at', 'created_at', { unique: false });
        }

        // Projects store
        if (!database.objectStoreNames.contains(STORES.PROJECTS)) {
          const projectsStore = database.createObjectStore(STORES.PROJECTS, {
            keyPath: 'id',
            autoIncrement: true,
          });
          projectsStore.createIndex('category', 'category', { unique: false });
          projectsStore.createIndex('year', 'year', { unique: false });
        }

        console.log('📋 Database stores created');
      };
    } catch (error) {
      console.error('❌ Database initialization failed:', error);
      reject(error);
    }
  });

  return initPromise;
}

/**
 * Get the database instance
 */
export function getDatabase(): IDBDatabase {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first.');
  }
  return db;
}

/**
 * Generic function to get all records from a store
 */
export function query<T = any>(storeName: string): Promise<T[]> {
  return new Promise((resolve, reject) => {
    try {
      const database = getDatabase();
      const transaction = database.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result as T[]);
      };

      request.onerror = () => {
        reject(request.error);
      };
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Get records by index
 */
export function queryByIndex<T = any>(
  storeName: string,
  indexName: string,
  value: any
): Promise<T[]> {
  return new Promise((resolve, reject) => {
    try {
      const database = getDatabase();
      const transaction = database.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const index = store.index(indexName);
      const request = index.getAll(value);

      request.onsuccess = () => {
        resolve(request.result as T[]);
      };

      request.onerror = () => {
        reject(request.error);
      };
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Get a single record by ID
 */
export function getById<T = any>(storeName: string, id: number): Promise<T | null> {
  return new Promise((resolve, reject) => {
    try {
      const database = getDatabase();
      const transaction = database.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(id);

      request.onsuccess = () => {
        resolve(request.result as T || null);
      };

      request.onerror = () => {
        reject(request.error);
      };
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Insert a record and return the inserted ID
 */
export function insert<T = any>(storeName: string, data: Omit<T, 'id'>): Promise<number> {
  return new Promise((resolve, reject) => {
    try {
      const database = getDatabase();
      const transaction = database.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      
      // Add timestamps if not present
      const record: any = {
        ...data,
        created_at: data['created_at'] || new Date().toISOString(),
      };

      const request = store.add(record);

      request.onsuccess = () => {
        resolve(request.result as number);
      };

      request.onerror = () => {
        reject(request.error);
      };
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Update a record
 */
export function update<T = any>(storeName: string, id: number, data: Partial<T>): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      const database = getDatabase();
      const transaction = database.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      
      // Get existing record
      const getRequest = store.get(id);
      
      getRequest.onsuccess = () => {
        const existing = getRequest.result;
        if (!existing) {
          reject(new Error('Record not found'));
          return;
        }

        // Merge with updates
        const updated = {
          ...existing,
          ...data,
          id, // Ensure ID doesn't change
          updated_at: new Date().toISOString(),
        };

        const putRequest = store.put(updated);

        putRequest.onsuccess = () => {
          resolve();
        };

        putRequest.onerror = () => {
          reject(putRequest.error);
        };
      };

      getRequest.onerror = () => {
        reject(getRequest.error);
      };
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Delete a record
 */
export function deleteRecord(storeName: string, id: number): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const database = getDatabase();
      const transaction = database.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(id);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(request.error);
      };
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Clear all data from a store
 */
export function clearStore(storeName: string): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const database = getDatabase();
      const transaction = database.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.clear();

      request.onsuccess = () => {
        console.log(`🗑️ Cleared store: ${storeName}`);
        resolve();
      };

      request.onerror = () => {
        reject(request.error);
      };
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Clear all data from the database (for testing/reset)
 */
export async function clearDatabase(): Promise<void> {
  const storeNames = Object.values(STORES);
  
  for (const storeName of storeNames) {
    await clearStore(storeName);
  }
  
  console.log('🗑️ Database cleared');
}

/**
 * Export store names for use in services
 */
export { STORES };

// Backwards compatibility aliases
export const execute = async (sql: string, params?: any[]) => {
  console.warn('execute() is deprecated. Use insert/update/delete methods instead.');
};

export const saveDatabase = () => {
  // IndexedDB auto-persists, no manual save needed
  console.log('💾 Database auto-saved (IndexedDB)');
};
