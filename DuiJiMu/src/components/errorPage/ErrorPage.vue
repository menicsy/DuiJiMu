<template>
  <div class="error_contain">
    <h1 class="error_logo">
      <div class="error_box">
        <div class="error_msg">Error<br/>页面不存在</div>
      </div>
    </h1>
  </div>
</template>

<style scoped>
.error_contain{
  position: fixed;
  width: 100%;
  height: 100%;
  background: url("source/error.png") ;
  background-size:cover;
}
.error_contain .error_logo{
  position: absolute;
  top:50%;
  left:50%;
  margin-left:-100px;
  margin-top:-100px;
  border-radius: 20px;
  width:200px;
  height:200px;
  background: yellow;
  transform: rotate(48deg);
  -o-transform:rotate(48deg);
  -webkit-transform:rotate(48deg);
  -moz-transform:rotate(48deg);
  box-shadow: 6px 6px 5px #FFFF00;
  -o-box-shadow:6px 6px 5px #FFFF00;
  -webkit-box-shadow:6px 6px 5px #FFFF00;
  -moz-box-shadow:6px 6px 5px #FFFF00;
  padding:10px;
  animation:mymove 5s infinite;
  -webkit-animation:mymove 5s infinite;
  -o-animation:mymove 5s infinite;
  -moz-animation:mymove 5s infinite;
}
@keyframes mymove {
  from {top:30%;}
  to {top:50%;}
}
@-webkit-keyframes mymove {
  from {top:30%;}
  to {top:50%;}
}
@-o-keyframes mymove {
  from {top:30%;}
  to {top:50%;}
}
@-moz-keyframes mymove {
  from {top:30%;}
  to {top:50%;}
}
.error_contain .error_logo .error_box{
  position: absolute;
  top:50%;
  left:50%;
  margin-left:-86px;
  margin-top:-86px;
  border-radius: 20px;
  width:160px;
  height:160px;
  background: yellow;
  border: 10px solid #000;
  transform: rotate(0deg);
  -o-transform:rotate(0deg);
  -webkit-transform:rotate(0deg);
  -moz-transform:rotate(0deg);
}
.error_contain .error_logo .error_msg{
  position: absolute;
  top:50%;
  left:50%;
  margin-left:-60px;
  margin-top:-50px;
  width:120px;
  height:100px;
  transform: rotate(-48deg);
  -o-transform:rotate(-48deg);
  -webkit-transform:rotate(-48deg);
  -moz-transform:rotate(-48deg);
  text-align: center;
  line-height: 30px;
  font-size: 20px;
}
</style>
