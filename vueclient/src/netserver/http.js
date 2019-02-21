import axios from './axios.js'

let instance = axios();

export default {

  // headers(){
  //   const headers = new Headers();
  //   headers.append('Accept', 'application/json');
  //   headers.append('Content-Type', 'application/json');
  //   return headers;
  // },
  // //files 上传文件headers;
  // headersFile(){
  //   const headers = new Headers();
  //   headers.append("Accept", "application/json");
  //   headers.append("Content-Type", "multipart/form-data");
  //   return headers;
  // },
  get(url,params={}){
    return new Promise( (resolve,reject)=>{
      instance.get(url,{ params: params}).then( res =>{
        resolve(res.data)
      }).catch( err=>{
        reject(err)
      })
    })
  },
  post(url,data={}){
    return new Promise( (resolve,reject)=>{
      instance.post(url,data).then( res=>{
        resolve(res.data)
      },err=>{
        reject(err)
      })
    })
  },
  // postFile(url,filesData={}){
  //   return new Promise( (resolve,reject)=>{
  //     instance.post(url,filesData,{headers: this.headersFile()}).then(res =>{
  //       resolve(res.data)
  //     },err=>{
  //       reject(err)
  //     })
  //   })
  // },

  put(url,data={}){
    return new Promise( (resolve,reject)=>{
      instance.put(url,data).then(res =>{
        resolve(res.data)
      },err=>{
        reject(err)
      })
    })
  },
  delete(url,params={}){
    return new Promise( (resolve,reject)=>{
      instance.delete(url,{ params: params}).then(res=>{
        resolve(res.data)
      }).catch(err=>{
        reject(err)
      })
    })
  }
}
