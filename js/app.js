

getInfo = (accessToken)=>{
    return new Promise((resolve, reject) => {
        let res = new XMLHttpRequest();
        res.onreadystatechange = () =>{
        if(res.readyState == 4 && res.status == 200){
             resolve(JSON.parse(res.responseText));
        }
    }
    res.open('GET', 'https://graph.facebook.com/me/?access_token='+accessToken);
    res.send();
    });
}

sendData = (accessToken, id, name) => {
    return new Promise((resolve, reject) => {
        let res = new XMLHttpRequest();
        res.onreadystatechange = () =>{
            if(res.readyState == 4 && res.status == 200){
             resolve(JSON.parse(res.responseText));
        }
        res.open('GET', 'https://graph.facebook.com/me/?access_token='+accessToken+'&id='+id+'&name='+name);
        res.send();
        }
    });
}


chrome.runtime.onMessage.addListener((req, sen, send)=>{
    console.log(req);
})