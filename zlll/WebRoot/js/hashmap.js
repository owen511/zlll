 
 function HashMap()   
 {   

     var size = 0;   

     var entry = new Object();   
        

     this.put = function (key , value)   
     {   
         if(!this.containsKey(key))   
         {   
             size ++ ;   
         }   
         entry[key] = value;   
     }   
        

     this.get = function (key)   
     {   
         return this.containsKey(key) ? entry[key] : null;   
     }   
        

     this.remove = function ( key )   
     {   
         if( this.containsKey(key) && ( delete entry[key] ) )   
         {   
             size --;   
         }   
     }   
        
     this.containsKey = function ( key )   
     {   
         return (key in entry);   
     }   
        
     this.containsValue = function ( value )   
     {   
         for(var prop in entry)   
         {   
             if(entry[prop] == value)   
             {   
                 return true;   
             }   
         }   
         return false;   
     }   
        
     this.values = function ()   
     {   
         var values = new Array();   
         for(var prop in entry)   
         {   
             values.push(entry[prop]);   
         }   
         return values;   
     }   
 
     this.keys = function ()   
     {   
         var keys = new Array();   
         for(var prop in entry)   
         {   
             keys.push(prop);   
         }   
         return keys;   
     }   
        
     this.size = function ()   
     {   
         return size;   
     }   
        
     this.clear = function ()   
     {   
         size = 0;   
         entry = new Object();   
     }   
 }
 
 function doStrToHashMap(strkv,type){
	var tmap = new HashMap();
	if(strkv != null && strkv != ""){
	   var arr_kv = strkv.split(',');
	   if(arr_kv != null && arr_kv.length > 0){
	      var kv = null;
	      var arr_v = null;
	      for(var i = 0;i<arr_kv.length;i++){
	           kv = arr_kv[i];
	           arr_v = kv.split("-");
	           if(type == 0){
	              tmap.put(arr_v[0],arr_v[2]+"-"+arr_v[1]);
	           }else if(type == 1){   
	              tmap.put(arr_v[0],arr_v[0]+"-"+arr_v[1]);	           
	           }   
	      }
	   }
	} 
	return tmap;
 }   
