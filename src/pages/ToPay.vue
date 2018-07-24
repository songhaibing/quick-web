<template>
  <div>
    <div class="mainer">
      <!--第一个card-->
      <div class="header-card">
        <div class="pay-money">
          <div class="money">
            <span class="header-money">消费金额</span>
            <span class="header-num">259.65</span>
          </div>
          <span class="header-describe">不参与优惠金额</span>
        </div>
        <div class="vip-discount">
          <div class="vip-font">会员折扣</div>
          <div class="discount-num">-10.00</div>
          <div class="discount-font">(8折)</div>
        </div>
        <div class="discount-coupon">
          <div class="discount-container">
            <span class="discount-font">优惠券</span>
            <span class="discount-num">-9.65</span>
          </div>
          <div class="discount-icon">
            <img class="logo" src="/static/logo2@3x.png">
          </div>
        </div>
        <div class="integration-discount">
          <div class="integration-container">
            <span class="integration-font">积分折扣</span>
            <span class="integration-num">-10.00</span>
            <span class="discount-font">(使用100积分)</span>
          </div>
          <div class="integration-icon">
            <img class="integration-logo" src="/static/xuanzhong@3x.png">
          </div>

        </div>
        <div class="amount-payable">
          <div class="amount-font">应付金额</div>
          <div class="amount-num">230.00</div>
        </div>
      </div>
      <!--第二个card-->
      <div class="center-card">
        <div class="wx-pay">
          <div class="wx-left">
            <img class="left-logo" src="/static/wx@3x.png" alt="logo">
            <span class="wx-font">微信支付</span>
          </div>
          <div class="wx-right">
            <img class="right-logo" src="/static/xuanzhong@3x.png" alt="logo">
          </div>
        </div>
        <div class="save-money">
          <div class="save-left">
            <img class="left-logo" src="/static/money@3x.png">
            <span class="save-font">储值金额</span>
            <span class="save-description">当前金额30元</span>
          </div>
          <div class="save-right">
            <img class="right-logo" src="/static/weizhong-@3x.png">
          </div>
        </div>
        <div class="recharge">
          <div class="recharge-font">冲220送22元</div>
          <div class="recharge-icon">
            <img class="right-logo" alt="logo" src="/static/weizhong-@3x.png">
          </div>
        </div>
        <div class="describe">
          <div class="describe-font">到账24元，支付后剩余32元</div>
        </div>
        <div class="recharge">
          <div class="recharge-font">充600送80元</div>
          <div class="recharge-icon">
            <img class="right-logo" alt="logo" src="/static/weizhong-@3x.png">
          </div>
        </div>
        <div class="recharge">
          <div class="recharge-font">充1000送120元</div>
          <div class="recharge-icon">
            <img class="right-logo" alt="logo" src="/static/weizhong-@3x.png">
          </div>
        </div>
        <div class="input-confirm">
          <input class="input" placeholder="添加备注"/>
        </div>
      </div>
      <div class="footer">
        <button class="button">¥200.00 确认买单</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ToPay"
  }
</script>

<style lang="scss" scoped>
  .mainer {
    /*第二card样式*/
    & .header-card {
      background-color: white;
      margin: 0.5rem;
      border-radius: 0.25rem;
      & .pay-money {
        display: flex;
        width: 330px;
        line-height: 2.2rem;
        height: 2.2rem;
        justify-content: space-between;
        align-items: center;

        padding:0 10px;
        & .money{
          & .header-money {
            font-size: 0.8rem;
            color: #333333;
          }
          & .header-num {
            padding-left: 0.7rem;
            font-size: 0.8rem;
            color: #e51c23;
            font-weight: bold;
          }
        }
        & .header-describe {
          font-size: 0.7rem;
          color: #586c94;
        }
      }
      & .vip-discount {
        display: flex;
        line-height: 2.2rem;
        height: 2.2rem;
        margin-left: 0.5rem;
        width: 100%;
        border-top: 1px solid #f0f0f0;
        & .vip-font {
          font-size: 0.8rem;
          color: #333333;
        }
        & .discount-num {
          font-size: 0.8rem;
          color: #9eaab6;
          padding-left: 1rem;
        }
        & .discount-font {
          font-size: 0.8rem;
          color: #9eaab6;
          padding-left: 0.5rem;
        }
      }
      & .discount-coupon {
        display: flex;
        width: 330px;
        line-height: 2.2rem;
        height: 2.2rem;
        justify-content: space-between;
        align-items: center;
        padding:0 0.5rem;
        & .discount-container{
          & .discount-font {
            font-size: 0.8rem;
            color: #333333;
          }
          & .discount-num {
            padding-left: 1.5rem;
            font-size: 0.8rem;
            color: #9eaab6;
          }
        }
        & .discount-icon {
          & .logo {
            width: 0.4rem;
            height: 0.75rem;
          }
        }
      }
      & .integration-discount {
        display: flex;
        width: 330px;
        line-height: 2.2rem;
        height: 2.2rem;
        justify-content: space-between;
        align-items: center;
        padding:0 0.5rem;
        & .integration-container{
          & .integration-font {
            font-size: 0.8rem;
            color: #333333;
          }
          & .integration-num {
            font-size: 0.8rem;
            color: #9eaab6;
            padding-left: 0.8rem;
          }
          & .discount-font {
            font-size: 0.8rem;
            color: #9eaab6;
            padding-left: 0.2rem;
          }
        }
        & .integration-icon {
          & .integration-logo {
            width: 0.8rem;
            height: 0.8rem;
          }
        }
      }
      & .amount-payable {
        display: flex;
        margin-left: 0.5rem;
        line-height: 2.2rem;
        height: 2.2rem;
        border-top: 1px solid #f0f0f0;
        & .amount-font {
          font-size: 0.8rem;
          color: #333333;
        }
        & .amount-num {
          padding-left: 1rem;
          font-size: 0.8rem;
          color: #e51c23;
          font-weight: bold;
        }
      }
    }
    /*第二个card样式*/
    & .center-card {
      background-color: white;
      margin: 0.5rem;
      border-radius: 0.25rem;
      & .wx-pay {
        display: flex;
        width: 330px;
        line-height: 2.2rem;
        height: 2.2rem;
        justify-content: space-between;
        align-items: center;
        padding:0 0.5rem;
        & .wx-left {
          display: flex;
          align-items: center;
          justify-content: center;
          & .left-logo {
            width: 0.95rem;
            height: 0.95rem;
          }
        }
        & .wx-right {
          & .right-logo {
            width: 0.8rem;
            height: 0.8rem;
          }
        }
        & .wx-font {
          margin-left: 0.5rem;
          font-size: 0.8rem;
          color: #333333;
        }
      }
      & .save-money{
        display: flex;
        width: 330px;
        line-height: 2.2rem;
        height: 2.2rem;
        justify-content: space-between;
        align-items: center;
        padding:0 0.5rem;
        & .save-left{
          display: flex;
          justify-content: center;
          align-items: center;
          & .left-logo{
            width:0.95rem ;
            height:0.95rem ;
          }
          & .save-font{
            margin-left: 0.5rem;
            font-size: 0.8rem;
            color: #333333;
          }
          & .save-description{
            margin-left: 0.5rem;
            font-size: 0.7rem;
            color: #9eaab6;
          }
        }
        & .save-right{
          & .right-logo{
            width: 0.8rem;
            height: 0.8rem;
          }
        }
      }
      & .recharge{
        display: flex;
        width: 330px;
        line-height: 2.2rem;
        height: 2.2rem;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.5rem;
        & .recharge-font{
          padding-left:1.4rem;
          font-size: 0.8rem;
          color: #333333;
        }
        & .recharge-icon{
          & .right-logo{
            width: 0.8rem;
            height: 0.8rem;
          }
        }
      }

     & .describe{
       line-height: 1.15rem;
       height: 1.15rem;
       background: #fdf5e1;
       & .describe-font{
         margin-left: 1.9rem;
         color: #eabd08;
         font-size: 0.7rem;
       }
     }
    }
    & .input-confirm{
      border-top:1px solid #f0f0f0;
      line-height: 2.3rem;
      height: 2.3rem;
      margin-left: 20px;
      & .input{
        width: 100%;
        border: none;
        outline: medium;
        color: #333333;;
        font-size: 0.8rem;
      }
      input::placeholder{
        color: #b2b2b2;
        font-size: 0.8rem;
      }
    }
    & .footer {
      display: flex;
      align-items: center;
      position: fixed;
      bottom: 0;
      left: 0;
      height: 3.2rem;
      width: 100%;
      padding: 0 0.8rem;
      box-sizing: border-box;
      background-color: #ffffff;
      & .button {
        height: 2.2rem;
        width: 100%;
        color: #fff;
        font-size: 0.8rem;
        background: #dd2726;
        border-radius: 0.25rem;
        &:after {
          display: none;
        }
      }
    }
  }
</style>
