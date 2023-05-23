

export const STATUS_ON = 'HIGH';
export const STATUS_OFF = 'LOW';

export const STATE_ACTIVE = 'ACTIVE';
export const STATE_RESET = 'RESET';

export interface UserDoc {
    details: UserDetailDoc;
    devices: {
        [key: string]: DeviceDoc
    }
}

export interface UserDetailDoc {
    name: string;
}

export interface DeviceDoc {
    state: 'ACTIVE' | 'RESET';
    status: 'HIGH' | 'LOW';
}