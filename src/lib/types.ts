

export const STATUS_ON = 'HIGH';
export const STATUS_OFF = 'LOW';

export const STATE_ACTIVE = 'ACTIVE';
export const STATE_RESET = 'RESET';

export type Varient = 'light' | 'dark' | 'black';

export interface UserDoc {
    details: UserDetailDoc;
    devices: {
        [key: string]: DeviceDoc
    }
}

export interface UserDetailDoc {
    name: string;
}

export interface DeviceDetailDoc {
    state: 'ACTIVE' | 'RESET';
    status: 'HIGH' | 'LOW';
    name: string;
    ping: number;
}

export interface DeviceHistoryDoc {
    message: string;
    createdAt: number;
}

export interface DeviceMemoryDoc {
    freeHeap: number;
    heapFragmentation: number;
    maxFreeBlockSize: number;
    createdAt: number;
}

export interface DeviceDoc {
    details: DeviceDetailDoc,
    history: {
        [key: string]: DeviceHistoryDoc
    }

}