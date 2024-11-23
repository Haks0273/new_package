<template>
  <el-carousel :interval="4000" type="card" height="200px" style="position: relative; top: 50vh;">
    <el-carousel-item v-for="(item, index) in imgList" :key="index">
      <router-link to="/createtool">
        <div class="container">
          <img :src="item" alt="Carousel image" class="img" />
          <div class="text">
            <h3 class="title">{{ itemTextList[index] }}</h3>
            <p class="description">这是与 {{ itemTextList[index] }} 相关的信息描述。</p>
          </div>
        </div>
      </router-link>
    </el-carousel-item>
  </el-carousel>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import can from '@/assets/can.png';
import canning from '@/assets/canning.png';
import Insert_lock_card from '@/assets/Insert_lock_card.png';
import plasticBottle from '@/assets/plasticBottle.png';
import jar from '@/assets/jar.png';
import octagonal_seal_bag from '@/assets/octagonal_seal_bag.png';
import stand_up_pouch from '@/assets/stand_up_pouch.png';
import three_side_seal_bag from '@/assets/three_side_seal_bag.png';

const imgList = ref([can, canning, Insert_lock_card, plasticBottle, jar, octagonal_seal_bag, stand_up_pouch, three_side_seal_bag]);

const itemTextList = ref(['罐装', '罐头', '锁卡包装', '塑料瓶', '玻璃罐', '八角密封袋', '自立袋', '三边封袋']);

</script>


<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
  width: 670px;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #fefefe;
  width: 670px;
}
.container {
  display: flex;
  background-color: #333;
  color: #ffffff;
}

.img {
  width: 200px;
  height: 200px;
}

.text {
  flex: 1;
}

.title {
  font-size: 18px;
  font-weight: bold;
  color: #952e2e;
  margin: 0;
}

.description {
  font-size: 14px;
  color: #ffffff;
}
</style>
