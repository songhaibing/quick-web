<template>
  <div class="mainer">
    <!--<div class="header">-->
    <!--<span class="item">爱拓客体验店</span>-->
    <!--</div>-->
    <div class="page-cont">
      <div class="top">
        <div class="main" @click="isShow" v-show="isHide">
          <div class="main-container">
            <img class="main-logo" src="/static/logo1@3x.png" alt="logo">
            <span class="main-font">注册会员，享受更多优惠</span>
          </div>
          <img class="right-logo" src="/static/logo2@3x.png" alt="logo">
        </div>
        <!--card组件用来输入金额-->
        <div class="wrap">
          <div class="mainer">
            <div class="pay-font">消费金额</div>
            <div class="pay-icon">
              <div class="icon">¥</div>
              <input v-model="money" class="pay-input"/>
            </div>
          </div>
          <div class="center" v-show="isHideOnSave" @click="isShowModal">
            <div class="center-font">优惠卷</div>
            <img class="center-logo" src="/static/logo2@3x.png" alt="logo">
          </div>
          <div class="footer">
            <input v-model="remark" class="footer-input" placeholder="添加备注"/>
            <div @click="clearValue">
              <img class="footer-logo" src="/static/logo3@3x.png" alt="logo"/>
            </div>

          </div>
        </div>
      </div>
      <!--底部键盘-->
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
            <div class="li" style="line-height: 1.9rem" data-num='.'>.</div>
          </div>
        </div>
        <div class="right">
          <div class="cancel" data-num='D'>
            <img class="cancel-logo" src="../../static/logo4@3x.png" data-num='D'>
          </div>
          <div class="sure" data-num='S'>确定</div>
        </div>
      </div>
    </div>
    <!--弹出框-->
    <div class="modal-mask" v-if="hiddenModal" catchtouchmove="preventTouchMove">
      <div class="modal-dialog" v-if="hiddenModal">
        <div class="container">
          <div class="modal-title">注册会员</div>
          <div @click="close">
            <img src="/static/guanbi@3x.png">
          </div>
        </div>
        <div class="modal-font">
          <span class="modal-name">姓名</span>
          <input class="modal-input" v-model="formValidate.name" placeholder="请输入姓名">
        </div>
        <div class="wire"></div>
        <div class="modal-phone">
          <span class="modal-relation">联系电话</span>
          <input class="phone-input" v-model="formValidate.phoneNumber" placeholder="请输入联系电话">
        </div>
        <div class="wire"></div>
        <div class="modal-footer">
          <div class="btn-confirm" @click="sure">确定</div>
        </div>
      </div>
    </div>
    <!--底部弹出框-->
    <div class="bottom-mask" v-if="showModal" catchtouchmove="preventTouchMove">
      <div class="bottom-dialog" v-if="showModal">
        <div class="bottom-header">
          <div class="header-add" @click="addDiscount">添加优惠券</div>
          <div class="header-select">选择优惠券</div>
          <div class="header-nonUse" @click="noUse">不使用优惠券</div>
        </div>
        <div class="bottom-footer">
          <div class="footer-container" v-for="(item,index) in res" :key="index">
            <div class="ticket" :style="{ 'background': item.color }">
              <div class="circle"></div>
              <div class="circle"></div>
              <div class="circle"></div>
              <div class="circle"></div>
              <div class="circle"></div>
              <div class="circle"></div>
              <div class="circle"></div>
              <div class="circle"></div>
              <div class="circle"></div>
              <div class="circle"></div>
              <div class="ticket-fon">
                <span class="ticket-money">¥{{item.reduce_cost}}</span>
                <span class="money-font">{{item.title}}</span>
              </div>
            </div>
            <div class="ticket-font">
              <div class="ticket-container1">
                <div class="spot"></div>
                <span class="collect-money">{{$PROPERTYNAME[item.use_module]}}</span>
                <span class="collect" v-show="item.enable_member_discount==0">不与会员折扣共享</span>
              </div>
              <div class="ticket-container2">
                <div class="spot"></div>
                <span class="time">{{item.expiry_time}}</span>
              </div>
              <div class="ticket-container3">
                <div class="spot"></div>
                <span class="week">{{item.use_time}}</span>
              </div>
            </div>
            <div class="ticket-icon" v-show="nowIndex!==index&&max_coupon_dis_amount>=item.least_cost&&item.use_status" @click="whether(index)"></div>
            <img class="ticket-img" src="/static/gou.png" @click="isImage" v-show="nowIndex==index" alt="logo">
            <img src="/static/nodisable@3x.png" v-show="item.least_cost>=max_coupon_dis_amount||!item.use_status" class="disable-img" alt="logo">
          </div>
        </div>

      </div>
    </div>
    <!--添加优惠券弹出框-->
    <div class="add-mask" v-if="show" catchtouchmove="preventTouchMove">
      <!--错误提示-->
      <div class="error" v-if="showError">没有对应的优惠码</div>
      <div class="add-dialog" v-if="show">
        <div class="container">
          <div class="add-title">添加优惠码</div>
        </div>
        <div class="add-font">
          <input class="add-input" v-model="code" placeholder="请输入优惠码">
        </div>
        <div class="add-footer">
          <div class="btn-cancel" @click="cancel">取消</div>
          <div class="btn-confirm" @click="confirm">确定</div>
        </div>

      </div>
    </div>

  </div>
</template>
<script>
  import { Toast } from 'vant';
  export default {

    data() {
      return {
        res: [],
        errorCode: null,
        money: '',
        code:'',
        hiddenModal: false,//弹出框显隐
        showError:false,
        formValidate: {
          name: '',
          phoneNumber: '',
        },
        isHide: '',//标题显隐
        isHideOnSave: '',//优惠卷显隐
        remark: '',
        showModal: '',//底部优惠卷显隐
        show:'',//添加优惠券显隐
        isShowImg: false,
        isShowCircle: true,//圆是默认出现
        nowIndex: null,
        is_use_points: 0,
        coupon_detail_id: 0,
        max_coupon_dis_amount: null
      }
    },
    //监听输入金额值的变化
    watch: {
      money: function () {
        setTimeout(async () => {
          let res = await this.$HTTP.post(this.HOST + '/api/quickpay/preorder',
            {
              store_id: 49,
              bill_amount: this.money,
              is_use_points: this.is_use_points,
              coupon_detail_id: this.coupon_detail_id
            })
          this.max_coupon_dis_amount = res.data.result.max_coupon_dis_amount
        }, 2000)

      }
    },
    components: {},
    async created() {
      await this.isLogin()
      await this.memberType()
      await this.accredit()
      await this.isOnSale()
    },
    methods: {
      //点击取消弹出框消失
      cancel(){
        this.show=false
      },
      async confirm(){
        let res= await this.$HTTP.post(this.HOST + '/api/coupon/sn/change', {code: this.code})
        console.log(res.data)
        if(res.data.error_code==1){
         this.showError=true
          setTimeout(()=>{
            this.showError=false
          },2000)
        }else{
          this.show=false
          this.showModal=false
          Toast.success('添加成功');
        }
      },
      //点击添加优惠券弹出框
      addDiscount(){
        this.show=true
      },
      //点击不使用优惠券底部弹出框消失
      noUse() {
        this.showModal = false
        this.coupon_detail_id = 0
      },
      //点击圆隐藏圆显示图片
      whether(index) {
        this.nowIndex = index
      },
      //点击图片隐藏图片
      isImage() {
        this.nowIndex = null
      },
      //点击  底部弹出优惠券框
      isShowModal() {
        this.showModal = true
      },
      clearValue() {
        this.remark = ''
      },
      //判断是否登陆
      async isLogin() {
        let that = this
        await this.$HTTP.post(this.HOST + '/api/check/login', {store_id: 49})
          .then(function (res) {
          }).catch(function (error) {
            that.errorCode = error.response.status
          })
      },
      //拿到错误码401，让用户授权
      async accredit() {
        if (this.errorCode === 401) {
          let res = await this.$HTTP.post(this.$ADDRESS + '/api/auth', {store_id: 49})
          window.location.href = res.data.result;
        }
      },
      //是否显示横条
      async memberType() {
        let res = await this.$HTTP.post(this.HOST + '/api/card/my')
        if (res.data.result == null) {
          this.isHide = true
        } else {
          this.isHide = false
        }
      },
      //是否显示优惠卷
      async isOnSale() {
        let res = await this.$HTTP.post(this.HOST + '/api/quickpay/coupons', {store_id: 49})
        console.log(res)
        this.res = res.data.result
        if (res.data.result) {
          this.isHideOnSave = true
        } else {
          this.isHideOnSave = false
        }
      },
      sure() {
        const phoneTest = new RegExp("^1[3|4|5|7|8][0-9]{9}$");
        console.log(typeof this.errorCode)
      },
      //点击关闭按钮关闭弹出框
      close() {
        this.hiddenModal = false
      },
      isShow() {
        this.hiddenModal = true
      },
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
      //处理数字
      _handleNumberKey(num) {
        let S = this.money;

        //如果有小数点且小数点位数不小于2
        if (S.indexOf('.') > -1 && S.substring(S.indexOf('.') + 1).length < 2)
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
        if (!S.length) {
          alert('您目前未输入!')
          return false;
        }
        //将 8. 这种转换成 8.00
        if (S.indexOf('.') > -1 && S.indexOf('.') == (S.length - 1))
          S = Number(S.substring(0, S.length - 1)).toFixed(2);
        //保留两位
        S = Number(S).toFixed(2);
        this.$emit('confirmEvent', S)
      }
    },
  }

</script>

<style lang="scss" scoped>
  .mainer {
    height: 100%;
    overflow: hidden;
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
      line-height: 2rem;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.5rem;
      & .main-container {
        display: flex;
        align-items: center;
        justify-content: center;
        & .main-logo {
          width: 1rem;
          height: 1rem;
        }
        & .main-font {
          padding-left: 0.5rem;
          color: white;
          font-size: 0.8rem;
        }
      }
      & .right-logo {
        padding-right: 1.5rem;
        width: 0.4rem;
        height: 0.75rem;
        color: white;
      }
    }
  }

  .page-cont {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .top {
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
        font-size: 0.8rem;
      }
      & .pay-icon {
        display: flex;
        & .pay-input {
          padding-left: 0.5rem;
          width: 100%;
          border: none;
          outline: medium;
          font-size: 2rem;
        }
        & .icon {
          margin-left: 0.25rem;
          margin-top: 0.75rem;
          margin-bottom: 0.75rem;
          font-size: 1.3rem;
        }
      }

    }
    & .center {
      display: flex;
      justify-content: space-between;
      padding: 0.75rem 0 0.75rem 0;
      border-bottom: 1px solid #f0f0f0;
      & .center-font {
        font-size: 0.8rem;
      }
      & .center-logo {
        width: 0.425rem;
        height: 0.75rem;
      }
    }
    & .footer {
      margin-top: 0.75rem;
      font-size: 0.7rem;
      color: #afbcc9;
      display: flex;
      & .footer-input {
        width: 100%;
        border: none;
        outline: medium;
        color: #333333;
        font-size: 0.7rem;
      }
      input::placeholder {
        color: #b2b2b2;
        font-size: 0.7rem;
      }
      & .footer-logo {
        width: 0.8rem;
        height: 0.8rem;
      }
    }
  }

  .keword {
    background-color: white;
    display: flex;
    height: 10.2rem;
  }

  .right {
    width: 5rem;
  }

  .left {
    flex: 1;
  }

  .ul {
    display: flex;
  }

  .border-bottom {
    border-bottom: 1px solid #f5f5f5;
  }

  .li {
    flex: 1;
    text-align: center;
    height: 2.55rem;
    line-height: 2.55rem;
    font-size: 1.25rem;
    color: #12263c;
    border: 1px solid #f5f5f5;
    border-left: none;
    border-bottom: none;
  }

  .cancel {
    border-top: 1px solid #f5f5f5;
    text-align: center;
    color: #12263c;
    height: 5.1rem;
    line-height: 5.1rem;
    font-size: 1.25rem;
    & .cancel-logo {
      width: 1.3rem;
      height: 1.3rem;
    }
  }

  .sure {
    background-color: #d43b33;
    text-align: center;
    color: #fff;
    height: 5.1rem;
    line-height: 5.1rem;
  }

  .bottom-mask {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    overflow: hidden;
    z-index: 9000;
    & .bottom-dialog {
      height: 389px;
      width: 100%;
      overflow: hidden;
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 9999;
      background: white;
      display: flex;
      flex-direction: column;
      & .bottom-header {
        display: flex;
        justify-content: space-between;
        background-color: #ffff;
        height: 45px;
        width: 100%;
        align-items: center;
        & .header-add {
          font-size: 14px;
          color: #e51c23;
          padding-left: 10px;
        }
        & .header-select {
          font-size: 17px;
          color: #000000;
        }
        & .header-nonUse {
          font-size: 14px;
          color: #586c94;
          padding-right: 25px;
        }
      }
      & .bottom-footer {
        height: 344px;
        overflow: auto;
        width: 100%;
        background-color: #ebf1f5;
        & .footer-container {
          display: flex;
          margin: 12px 10px 10px 10px;
          height: 100px;
          background-color: #ffffff;
          position: relative;
          & .ticket {
            width: 100px;
            height: 100%;
            & .ticket-fon {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              margin-top: -80px;
              & .ticket-money {
                color: #ffffff;
                font-size: 26px;
              }
              & .money-font {
                color: #ffffff;
                font-size: 13px;
              }
            }

            & .circle {
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background-color: #ffffff;
              margin-left: 95px
            }
          }
          & .ticket-font {
            display: flex;
            flex-direction: column;
            margin-left: 20px;
            & .ticket-container1 {
              & .spot {
                display: inline-block;
                margin-top: 20px;
                background-color: #888888;
                border-radius: 50px;
                width: 3px;
                height: 3px
              }
              & .collect-money {
                font-size: 12px;
                color: #888888;
              }
              & .collect {
                font-size: 12px;
                color: #e51c23;
              }
            }
            & .ticket-container2 {
              & .spot {
                display: inline-block;
                margin-top: 20px;
                background-color: #888888;
                border-radius: 50px;
                width: 3px;
                height: 3px
              }
              & .time {
                font-size: 12px;
                color: #888888;
              }
            }
            & .ticket-container3 {
              & .spot {
                display: inline-block;
                margin-top: 20px;
                background-color: #888888;
                border-radius: 50px;
                width: 3px;
                height: 3px
              }
              & .week {
                font-size: 12px;
                color: #888888;
              }
            }
          }
          & .ticket-icon {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            border: 1px solid #b2b2b2;
            position: absolute;
            right: 20px;
            top: 35px
          }
          & .ticket-img {
            width: 20px;
            height: 20px;
            position: absolute;
            right: 17px;
            top: 35px
          }
          & .disable-img {
            position: absolute;
            right: 0;
            bottom: 0;
            width: 2rem;
            height: 2rem
          }
        }
      }

    }
  }

  /*点击标题弹出框样式*/
  .modal-mask {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    overflow: hidden;
    z-index: 9000;
    & .modal-dialog {
      border-radius: 5px;
      height: 257px;
      width: 320px;
      overflow: hidden;
      position: fixed;
      top: 33%;
      left: 0;
      z-index: 9999;
      background: white;
      margin: -90px 30px;
      & .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        & .modal-title {
          padding: 25px;
          font-size: 18px;
          color: #333333;
          font-weight: bold;
        }
        & img {
          padding-right: 25px;
          width: 17px;
          height: 17px;
        }
      }
      & .wire {
        border-bottom: 1px solid #f0f0f0;
        margin-left: 25px
      }
      & .modal-font {
        display: flex;
        align-items: center;
        padding: 0 25px 10px 25px;
        & .modal-name {
          font-size: 16px;
          color: #333333;
        }
        & .modal-input {
          padding-left: 50px;
          font-size: 16px;
          color: #333333;
          border: none;
          outline: medium;
        }
        input::placeholder {
          color: #b2b2b2;
          font-size: 16px;
        }
      }
      & .modal-phone {
        display: flex;
        align-items: center;
        padding: 10px 25px 10px 25px;
        & .modal-relation {
          font-size: 16px;
          color: #333333;
        }
        & .phone-input {
          padding-left: 20px;
          font-size: 16px;
          color: #333333;
          border: none;
          outline: medium;
        }
        input::placeholder {
          color: #b2b2b2;
          font-size: 0.8rem;
        }
      }
      & .modal-time {
        font-size: 13px;
        color: #e51c23;
        margin-left: 35px;
      }

      & .modal-footer {
        display: flex;
        flex-direction: row;
        margin-top: 50px;
        justify-content: center;
        & .btn-confirm {
          height: 44px;
          width: 290px;
          line-height: 44px;
          border-radius: 5px;
          background-color: #dd2726;
          text-align: center;
          font-size: 20px;
          color: #ffffff;
        }
      }
    }
  }
  /*添加优惠券弹出框*/
  .add-mask{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    overflow: hidden;
    z-index: 9000;
    & .error{
      background-color: #dd2726;
      line-height:30px;
      text-align: center;
      color: #ebf1f5;
      font-size: 15px
    }
    & .add-dialog{
      border-radius: 5px;
      height: 177px;
      width: 280px;
      overflow: hidden;
      position: fixed;
      top: 50%;
      left: 0;
      z-index: 9999;
      background: white;
      margin: -90px 50px;
      & .container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        & .add-title{
          padding: 15px;
          font-size: 18px;
          color: #000000;
        }
      }
      & .add-font{
        display: flex;
        justify-content: center;
        align-items: center;

        & .add-input{
          width:240px;
          height: 44px;
          border: 1px solid #e7e7e7;
          font-size: 0.8rem;
          outline: medium;
          padding-left: 20px;
          border-radius: 5px;
          background-color: #fbfafc;
        }
        input::placeholder {
          color: #b2b2b2;
          font-size: 0.8rem;
        }
      }
      & .add-footer{
        margin-top: 26px;
        display: flex;
        flex-direction: row;
        height: 46px;
        border-top: 1px solid #dedede;
        line-height: 46px;
        & .btn-cancel{
          width: 50%;
          text-align: center;
          font-size: 18px;
          color: #515151;
          background-color: #fbfafc;
        }
        & .btn-confirm{
          width: 50%;
          text-align: center;
          font-size: 18px;
          color: #e66363;
          background-color:#dd2726;
        }
      }
    }
  }
</style>
