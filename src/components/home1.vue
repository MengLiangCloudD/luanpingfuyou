<template>
    <div>

    </div>
</template>

<script>
    export default {
        created(){
            let cookiestr=document.cookie
            let arr=cookiestr.split(";");
            let cookiearr=[];
            for(let i=0;i<arr.length;i++){
                let _arr=arr[i].split("=");
                let key=_arr[0];
                let value=_arr[1];
                cookiearr.push({key,value});
            }
            for(let i=0;i<cookiearr.length;i++){
                if(cookiearr[i].key.trim()=="openid"){
                    let value1=cookiearr[i].value
                    localStorage.setItem('openid',value1);
                }else if(cookiearr[i].key.trim()=="headimgurl"){
                    let value2=cookiearr[i].value
                    let user={headimgurl:value2}
                    localStorage.setItem('user',JSON.stringify(user))
                }
            }
            this.$router.push("/home")
        }
    }
</script>

<style scoped>

</style>