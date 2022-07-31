<!--  -->
<template>
<van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="getList"
  :immediate-check="immediateCheck"
>
 <slot :list="list"></slot>
</van-list>

</template>

<script>
import { List } from "vant";
export default {
    name:'commonList',
  data() {
    return {
        skip:0,
        list:[],
        finished:false,
        loading:false
    };
  },
  props:{
    limit:{
        type:Number,
        default:10
    },
    immediateCheck:{
        default:true,
        type:Boolean
    },
    API:{
       type:Function
    },
    params:{
        type:Object
    }
  },
  components: {
    [List.name]: List,
  },

  methods: {
     
     getList(){
        let {skip,limit,params} = this;
       this.API({
        skip,limit,
        ...params
       }).then(res=>{
             if(res.code == 0){
                console.log(res)
                this.list.push(...res.data);
                let len = this.list.length;
                if(len>=res.count){
                    this.finished = true
                }else{
                    this.loading = false;
                    this.skip = len
                }
             }
       })

     }

  },
};
</script>
<style lang='scss'>
</style>