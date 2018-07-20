<template>
  <div class="mainer">
    <!--<div class="header">-->
      <!--<span class="item">爱拓客体验店</span>-->
    <!--</div>-->
    <div class="page-cont">
      <div class="top">
        <div class="main">
          <img class="main-logo" src="../../static/logo1@3x.png" alt="logo">
          <div class="main-font">注册会员，享受更多优惠</div>
          <img class="right-logo" src="../../static/logo2@3x.png" alt="logo">
        </div>
        <div class="wrap">
          <div class="mainer">
            <div class="pay-font">消费金额</div>
            <div class="pay-icon">
              <div class="icon">¥</div>
              <input v-model="money"  class="pay-input"/>
            </div>
          </div>
          <div class="footer">
            <input class="footer-input" placeholder="添加备注" />
            <img class="footer-logo" src="../../static/logo3@3x.png" alt="logo"/>
          </div>
        </div>
      </div>
      <div class="keword" @click.stop='_handleKeyPress'>
        <div class="left">
          <div class="ul">
            <div class="li" data-num='1'>1</div>
            <div class="li" data-num='2'>2</div>
            <div class="li" data-num='3'>3</div>
          </div>
          <div class="ul">
            <div class="li" data-num='4'>4</div>
            <div class="li" data-num='5'>5</div>
            <div class="li" data-num='6'>6</div>
          </div>
          <div class="ul">
            <div class="li" data-num='7'>7</div>
            <div class="li" data-num='8'>8</div>
            <div class="li" data-num='9'>9</div>
          </div>
          <div class="ul border-bottom">
            <div class="li" data-num='00'>00</div>
            <div class="li" data-num='0'>0</div>
            <div class="li" data-num='.'>.</div>
          </div>
        </div>
        <div class="right">
          <div class="cancel" data-num='D'>
            <img width="26px"  src="../../static/logo4@3x.png" data-num='D'>
          </div>
          <div class="sure" data-num='S'>确定</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>


  export default {
    data(){
      return{
        money : ''
      }
    },
    components: {},
    methods: {
      //处理按键
      _handleKeyPress(e) {
        let num = e.target.dataset.num;

        //不同按键处理逻辑

        switch (String(num)) {
          //小数点
          case '.':
            this._handleDecimalPoint();
            break;
          //删除键
          case 'D':
            this._handleDeleteKey();
            break;
          //清空键
          case 'C':
            this._handleClearKey();
            break;
          //确认键
          case 'S':
            this._handleConfirmKey();
            break;
          default:
            this._handleNumberKey(num);
            break;
        }
      },
      //处理小数点函数
      _handleDecimalPoint() {
        //如果包含小数点，直接返回
        if (this.money.indexOf('.') > -1) return false;
        //如果小数点是第一位，补0
        if (!this.money.length)
          this.money = '0.';

        //如果不是，添加一个小数点
        else
          this.money = this.money + '.';

      },
      //处理删除键
      _handleDeleteKey() {
        let S = this.money;
        //如果没有输入，直接返回
        if (!S.length) return false;
        //否则删除最后一个
        this.money = S.substring(0, S.length - 1);

      },
      //处理清空键
      _handleClearKey() {
        this.money = '';
      },
      //处理数字
      _handleNumberKey(num) {
        let S = this.money;

        //如果有小数点且小数点位数不小于2
        if ( S.indexOf('.') > -1 && S.substring(S.indexOf('.') + 1).length < 2)
          this.money = S + num;


        //没有小数点
        if (!(S.indexOf('.') > -1)) {
          //如果第一位是0，只能输入小数点
          if (num == 0 && S.length == 0)
            this.money = '0.';

          else {
            if (S.length && Number(S.charAt(0)) === 0) return;
            this.money = S + num;
          }

        }

      },
      //提交
      _handleConfirmKey() {
        let S = this.money;
        //未输入
        if (!S.length){
          alert( '您目前未输入!' )
          return false;
        }
        //将 8. 这种转换成 8.00
        if (S.indexOf('.') > -1 && S.indexOf('.') == (S.length - 1))
          S = Number(S.substring(0, S.length - 1)).toFixed(2);
        //保留两位
        S = Number(S).toFixed(2);
        this.$emit('confirmEvent',S)
      }
    }

    }

</script>

<style lang="scss">
  .mainer {
    height: 100%;
    & .header {
      height: 100%;
      background-color: white;
      width: 100%;
      height: 2.25rem;
      text-align: center;
      line-height: 2.25rem;
      & .left-icon {
        position: fixed;
        left: 1rem
      }
      & .item {
        font-size: 0.9rem;
        font-weight: 400;
      }
    }
    & .main {
      height: 100%;
      background-color: #4d7dfe;
      width: 100%;
      height: 2rem;
      display: flex;
      align-items: center;
      & .main-logo {
        position: fixed;
        left: 0.5rem;
        width: 1rem;
        height: 1rem;
      }
      & .main-font {
        margin-left: 2rem;
        color: white;
        font-size: 0.8rem;
      }

      & .right-logo {
        width: 0.8rem;
        height: 0.8rem;
        position: fixed;
        right: 0.8rem;
        color: white;
      }
    }
  }
  .page-cont{
    display: flex;
    flex-direction:column;
    height: 100%;
  }
  .top{

    flex: 1;
    width: 100%;
  }
  .wrap {
    border-radius: 0.25rem;
    background-color: white;
    padding: 1rem;
    margin: 0.75rem;
    & .mainer {
      border-bottom: 1px solid #f0f0f0;
      & .pay-font {
        color: #12263c;
        font-size: 16px;
      }
      & .pay-icon {
        display: flex;
        & .pay-input{
          padding-left: 0.5rem;
          width:100%;
          border:none;
          outline:medium;
          font-size:50px;
        }
        & .icon {
          margin-left: 0.25rem;
          margin-top: 0.75rem;
          margin-bottom: 0.75rem;
          font-size: 26px;
        }
      }

    }
    & .footer {
      margin-top: 0.75rem;
      font-size: 14px;
      color: #afbcc9;
      display: flex;
      & .footer-input{
        width:100%;
        border:none;
        outline:medium;
        color:#12263c;
        font-size:14px;
      }
      & .footer-logo{
        width: 0.8rem;
        height: 0.8rem;
      }
    }
  }
  .keword{
    background-color: white;
    display: flex;
    height: 204px;
  }
  .right{
    width: 100px;
  }
  .left{
    flex: 1;
  }
  .ul{
    display: flex;
  }
  .border-bottom{
    border-bottom:1px solid #f5f5f5;
  }
  .li{
    flex: 1;
    text-align: center;
    height: 51px;
    line-height: 51px;
    font-size: 25px;
    color: #12263c;
    border: 1px solid #f5f5f5;
    border-left: none;
    border-bottom: none;
  }
  .cancel{
    border-top:1px solid #f5f5f5;
    text-align: center;
    color: #12263c;
    height: 102px;
    line-height: 102px;
    font-size: 25px;
  }
  .sure{
    background-color: #d43b33;
    text-align: center;
    color: #fff;
    height: 102px;
    line-height: 102px;
  }
</style>
