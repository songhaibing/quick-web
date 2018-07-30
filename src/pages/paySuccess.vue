<template>
    <div class="main">
      <div class="header">
        <img  class="header-img" src="/static/success@3x.png">
        <div class="header-font">600.00</div>
      </div>
      <div class="wire1"></div>
      <div class="center">
        <div class="center-container">
          <div class="pay-font">消费金额</div>
          <div class="pay-mun">800.00</div>
        </div>
        <div class="center-container">
          <span class="pay-font">优惠金额</span>
          <span  class="pay-mun">200.00</span>
        </div>
        <div class="wire"></div>
      </div>
      <div class="footer">
        <div class="footer-font">交易时间</div>
        <div class="footer-time">2018-06-20</div>
        <div class="pay-time">10:22:36</div>
      </div>
      <div class="footer">
        <div class="footer-font">订单编号</div>
        <div class="pay-time">CA14546051NJMSHN152</div>
      </div>
      <div class="footer">
        <div class="footer-font">会员卡余额</div>
        <div class="pay-time">10:22:36</div>
      </div>
      <div class="footer">
        <div class="footer-font">当前积分</div>
        <div class="pay-time">20576</div>
      </div>
      <div class="btn">
        <button class="footer-button">完成</button>
      </div>

    </div>
</template>

<script>
    export default {
        name: "pay-success"
    }
</script>

<style lang="scss" scoped>
  .main{
    background: #ffff;
    min-height: 100%;
    & .header{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      & .header-img{
        width:4.3rem;
        height:4.3rem;
        padding: 1rem;
      }
      & .header-font{
        font-size:1.25rem;
        color: #12263C;
      }

    }
    & .wire1{
      margin-left: 0.5rem;
      margin-right: 0.5rem;
      border-bottom:  1px solid #F0F0F0;
    }
    & .center{
      & .center-container{
        display:flex;
        justify-content: space-between;
        padding: 0.5rem;
        & .pay-font{
          font-size:15px;
          color: #D43B33;
        }
        & .pay-mun{
          font-size:0.75rem;
          color: #D43B33;
        }
      }
      & .wire{
        margin-left: 0.5rem;
        margin-right: 0.5rem;
        border-top:  1px solid #F0F0F0;
      }
    }
    & .footer{
      display: flex;
      justify-content: space-between;
      padding: 0.5rem;
      & .footer-font{
        font-size:0.75rem;
        color: #9EAAB6;
      }
      & .footer-time{
        margin-left: 6rem;
        font-size:0.75rem;
        color: #9EAAB6;
      }
      & .pay-time{
        font-size:0.75rem;
        color: #9EAAB6;
      }
    }
    & .btn{
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top:1rem ;
      & .footer-button{
        background: #DD2726;
        border-radius:0.4rem;
        height: 2rem;
        width:17.25rem;
        color: #FFFFFF;
        font-size: 0.85rem;
        border: none;
        outline: none;
      }
    }

  }

</style>
