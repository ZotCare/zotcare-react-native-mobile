export const createImageFormData = (photo, body) => {
    let localUri = photo.path ? photo.path : photo.uri;
    let filename = photo.fileName ? photo.fileName : localUri.split('/').pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = photo.type ? photo.type : match ? `image/jpeg` : `image`;
//console.log('createImageFormData', { uri: photo.uri ? photo.uri : localUri, name: filename, type })
    let formData = new FormData();
    formData.append('image', { uri: photo.uri ? photo.uri : localUri, name: filename, type });
    Object.keys(body).forEach(key => {
        if (key === "image" || key === "localPath") return
        formData.append(key, body[key]);
    });
    return formData;
};

export const createFileFormData = (file, body) => {
    let localUri = file.path ? file.path : file.uri;
    let filename = localUri.split('/').pop();
    let type = file.mime;

    let formData = new FormData();
    formData.append('file', { uri: file.uri, name: filename, type });
    Object.keys(body).forEach(key => {
        if (key === "file" || key === "localPath") return
        formData.append(key, body[key]);
    });
    return formData;
};

export const createAudioFormData = (body) => {
    let localUri = body.uri;
    let filename = localUri.split('/').pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `audio/${match[1]}` : `audio`;

    let formData = new FormData();
    formData.append('file', { uri: localUri, name: filename, type });
    Object.keys(body).forEach(key => {
        if (key === "file" || key === "localPath") return
        if(Array.isArray(body[key])){
            for(var i = 0 ; i < body[key].length ; i++)
                formData.append(`${key}[]`, body[key][i])
            return
        }
        formData.append(key, body[key]);
    });
    return formData;
};

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function toEnglishDigit(x){
    //console.log("eng digi", x)
    var find = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']; 
    var replace = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']; 
    var replaceString = x; 
    var regex; 
    for (var i = 0; i < find.length; i++) { 
        regex = new RegExp(find[i], "g"); 
        replaceString = replaceString.replace(regex, replace[i]); 
    } 
    //console.log("english digit", x, replaceString)
    return replaceString; 
}

export function isNaNUtil(data) {
    var find = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    var isNumber = true;
    for (var i = 0 ; i < data.length ; i++) {
        //console.log(data[i], find.includes(data[i]), isNaN(data[i]))
        if(!find.includes(data[i]) && isNaN(data[i])){
            isNumber = false
            break
        }
    }
    //console.log(isNumber)
    return !isNumber
}

export function getLoadings(data) {    
    let loadings = {}
    Object.keys(data).forEach(d => {
        let a = Object.keys(data[d]).filter(function(k) {
            return k.includes('loading');
        }).reduce(function(newData, k) {
            newData[k] = data[d][k];
            return newData;
        }, {})
        loadings = {...loadings, ...a}
    })
    return loadings
}

export function getErrors(data) {    
    let errors = {}
    Object.keys(data).forEach(d => {
        let a = Object.keys(data[d]).filter(function(k) {
            return k.includes('error');
        }).reduce(function(newData, k) {
            newData[k] = data[d][k];
            return newData;
        }, {})
        errors = {...errors, ...a}
    })
    return errors
}

export function getErrorMessages(data) {    
    let errors = ""
    Object.keys(data).forEach(d => {
        let a = Object.keys(data[d]).filter(function(k) {
            return k.includes('err_message');
        }).reduce(function(newData, k) {
            // console.log("error message", data[d][k])
            newData[k] = data[d][k];
            return newData;
        }, {})
        // console.log(a)
        errors = errors || a.err_message
    })
    return errors
}