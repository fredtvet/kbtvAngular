const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const charLength = chars.length;

export function _commandIdGenerator(): string{
    var id = '';
    for ( var i = 0; i < 4; i++ ) {
        id += chars.charAt(Math.floor(Math.random() * charLength));
    }
    return id;
}