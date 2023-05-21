

export const STATUS_ON = 'HIGH';
export const STATUS_OFF = 'LOW';

export const STATE_ACTIVE = 'ACTIVE';
export const STATE_RESET = 'RESET';



export interface UserDoc {
    name: string;
    devices: {
        [key: string]: DeviceDoc;
    }
}

export interface DeviceDoc {
    state: 'ACTIVE' | 'RESET';
    status: 'HIGH' | 'LOW';
}