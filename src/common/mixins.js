
import {formatterDate} from '@/common/utils'

export default {
    data(){
      return {
        baseColor:'#07c160'
      }
    },
    filters:{
      formatterDate
    },
    methods:{
         checkLogin({msg='请先登录',t=500,url='/login'}={}){

              if(!this.$store.state.uid){
                this.$toast(msg)
                setTimeout(v=>{
                   this.$router.push(url)
                },t)
                return false
            }
             return true

         }



    }
  }