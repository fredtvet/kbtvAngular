const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
const charLength = chars.length;

export function _idGenerator(length: number = 7): string{
    var id = '';
    for ( var i = 0; i < length; i++ ) {
        id += chars.charAt(Math.floor(Math.random() * charLength));
    }
    return id;
}