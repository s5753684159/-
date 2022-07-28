
import { Button,Tabbar,TabbarItem ,NavBar ,Icon,Cell, CellGroup,Toast,Image as VanImage  } from 'vant'; 
import { Grid, GridItem } from 'vant';
import { Search } from 'vant';
import { PullRefresh } from 'vant';



import Vue from 'vue';   
Vue.use(PullRefresh);
Vue.use(Search);
Vue.use(Grid);
Vue.use(GridItem);

Vue.use(VanImage);
Vue.use(Tabbar);
Vue.use(TabbarItem);

Vue.use(Button);  
Vue.use(NavBar );  
Vue.use(Icon  );  
Vue.use(Cell  );  
Vue.use(CellGroup  );  
Vue.use(Toast  );  