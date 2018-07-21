<template>
  <div>
    <div class="mainer">
      <!--第一个card-->
      <div class="header-card">
        <div class="pay-money">
          <div class="header-money">消费金额</div>
          <div class="header-num">259.65</div>
          <div class="header-describe">不参与优惠金额</div>
        </div>
        <div class="vip-discount">
          <div class="vip-font">会员折扣</div>
          <div class="discount-num">-10.00</div>
          <div class="discount-font">(8折)</div>
        </div>
        <div class="discount-coupon">
          <div class="discount-font">优惠券</div>
          <div class="discount-num">-9.65</div>
          <div class="discount-icon">
            <img class="logo" src="/static/logo2@3x.png">
          </div>
        </div>
        <div class="integration-discount">
          <div class="integration-font">积分折扣</div>
          <div class="integration-num">-10.00</div>
          <div class="discount-font">(使用100积分)</div>
        </div>
        <div class="amount-payable">
          <div class="amount-font">应付金额</div>
          <div class="amount-num">230.00</div>
        </div>
      </div>
      <!--第二个card-->
      <div class="center-card">
        <div class="wx-pay">
          <div class="wx-font">微信支付</div>
        </div>
        <div>
          <div>微信支付</div>
        </div>
        <div>
          <div>微信支付</div>
        </div>
        <div>
          <div>微信支付</div>
        </div>
        <div>
          <div>微信支付</div>
        </div>
        <div>
          <div>微信支付</div>
        </div>
        <div>
          <div>微信支付</div>
        </div>
      </div>
      <div class="footer">
          <button class="button">确认买单</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ToPay"
  }
</script>

<style lang="scss">
  .mainer {
    /*第二card样式*/
    & .header-card {
      background-color: white;
      margin: 0.5rem;
      border-radius: 0.25rem;
      & .pay-money {
        display: flex;
        line-height: 2.2rem;
        height: 2.2rem;
        margin-left: 0.5rem;
        border-bottom: 1px solid #f0f0f0;
        & .header-money {
          font-size: 0.8rem;
          color: #333333;
        }
        & .header-num {
          margin-left: 1rem;
          font-size: 0.8rem;
          color: #e51c23;
          font-weight: bold;
        }
        & .header-describe {
          margin-left: 4.5rem;
          font-size: 0.7rem;
          color: #586c94;
        }
      }
      & .vip-discount {
        display: flex;
        line-height: 2.2rem;
        height: 2.2rem;
        margin-left: 0.5rem;
        & .vip-font {
          font-size: 0.8rem;
          color: #333333;
        }
        & .discount-num {
          font-size: 0.8rem;
          color: #9eaab6;
          margin-left: 1rem;
        }
        & .discount-font {
          font-size: 0.8rem;
          color: #9eaab6;
          margin-left: 0.5rem;
        }
      }
      & .discount-coupon {
        display: flex;
        margin-left: 0.5rem;
        line-height: 2.2rem;
        height: 2.2rem;
        & .discount-font {
          font-size: 0.8rem;
          color: #333333;
        }
        & .discount-num {
          font-size: 0.8rem;
          color: #9eaab6;
          margin-left: 1.75rem;
        }
        & .discount-icon {
          margin-left: 9.5rem;
          & .logo {
            width: 0.4rem;
            height: 0.75rem;
          }
        }
      }
      & .integration-discount {
        display: flex;
        margin-left: 0.5rem;
        line-height: 2.2rem;
        height: 2.2rem;
        border-bottom: 1px solid #f0f0f0;
        & .integration-font {
          font-size: 0.8rem;
          color: #333333;
        }
        & .integration-num {
          font-size: 0.8rem;
          color: #9eaab6;
          margin-left: 1rem;
        }
        & .discount-font {
          font-size: 0.8rem;
          color: #9eaab6;
          margin-left: 0.5rem;
        }
      }
      & .amount-payable {
        display: flex;
        margin-left: 0.5rem;
        line-height: 2.2rem;
        height: 2.2rem;
        & .amount-font {
          font-size: 0.8rem;
          color: #333333;
        }
        & .amount-num {
          margin-left: 1rem;
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
        margin-left: 0.5rem;
        line-height: 2.2rem;
        height: 2.2rem;
        & .wx-font {
          margin-left: 1.25rem;
          font-size: 0.8rem;
          color: #333333;
        }
      }
    }
    & .footer{
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
      & .button{
        height: 2.2rem;
        width: 100%;
        color: #fff;
        font-size: 0.8rem;
        background: #dd2726;
        border-radius:0.25rem ;
        &:after {
          display: none;
        }
      }
    }
  }
</style>
