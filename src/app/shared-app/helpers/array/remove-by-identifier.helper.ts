export function _removeByIdentifier<T>(originals: T[], deletedId: any, identifier: string): T[]{       
    if(!originals || originals.length == 0) return []; //If initial array empty, just return empty array

    let arr2 = originals.slice();
    for(var i = 0; i<arr2.length;i++){
      if(arr2[i][identifier] === deletedId){ 
        arr2.splice(i, 1);
        break;        	          
      }      
    };

    return arr2;
}