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
        <div class="error" v-show="errorMsg">{{error_msg}}</div>

        <!--card组件用来输入金额-->
        <div class="wrap">
          <div class="mainer">
            <div class="pay-font">消费金额</div>
            <div class="pay-icon">
              <div class="icon">¥</div>
              <input v-model="money" class="pay-input"/>
            </div>
          </div>
          <div class="center" v-show="isHideOnSave" @click="isShowModal" >
            <div class="center-font">优惠卷</div>
            <div style="margin-right: 46px">
              <span class="discount-num" v-show="coupon_type==2">{{discountNum}}折</span>
              <span class="center-num" :class="{centerNum1:coupon_type!==2}" v-show="isShowDiscount">减{{coupon_dis_amount}}</span>
            </div>
            <img class="center-logo" src="/static/logo2@3x.png" alt="logo">
          </div>
          <div class="cope" v-show="isShowMoney">
            <div class="cope-font">应付金额</div>
            <div class="cope-num">{{pay_amount}}</div>
          </div>
          <div class="footer">
            <input v-model="remarks" class="footer-input" placeholder="添加备注"/>
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
          <div class="sure" data-num='S' @click="makeSure">确定</div>
        </div>
      </div>
    </div>
    <!--弹出框-->
    <div class="modal-mask" v-if="hiddenModal" catchtouchmove="preventTouchMove">
      <div class="error" v-if="showErrorPhone">请输入11位联系电话</div>
      <div class="error" v-if="showErrorTitle">姓名或联系电话与已注册的账号不一致</div>
      <div class="modal-dialog" v-if="hiddenModal">
        <div class="container">
          <div class="modal-title">注册会员</div>
          <div @click="close">
            <img src="/static/guanbi@3x.png">
          </div>
        </div>
        <div class="modal-font">
          <span class="modal-name">姓名</span>
          <input class="modal-input" v-model="name" placeholder="请输入姓名">
        </div>
        <div class="wire"></div>
        <div class="modal-phone">
          <span class="modal-relation">联系电话</span>
          <input class="phone-input" v-model="phoneNumber" placeholder="请输入联系电话">
        </div>
        <div class="wire"></div>
        <div class="modal-footer">
            <button class="btn-confirm" @click="sure" :disabled="disabled">确定</button>
        </div>
      </div>
    </div>
    <!--底部弹出框(优惠券)-->
    <div class="bottom-mask" v-if="showModal" catchtouchmove="preventTouchMove">
      <div class="bottom-dialog" v-if="showModal">
        <div class="bottom-header">
          <div class="header-add" @click="addDiscount">添加优惠券</div>
          <div class="header-select">选择优惠券</div>
          <div class="header-nonUse" @click="noUse">不使用优惠券</div>
        </div>
        <div class="bottom-footer">
          <div class="footer-container" v-for="(item,index) in res" :key="index">
            <div class="ticket" :class="{disable:item.least_cost>=max_coupon_dis_amount,'text-danger': item.use_status==false } "
                 :style="{'background': item.color}">
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
                <span class="ticket-money" v-if="item.coupon_type==1">¥{{item.reduce_cost}}</span>
                <div style="display: flex;align-items: center">
                  <span class="ticket-money" v-if="item.coupon_type==2">{{item.discount/10}}</span>
                  <span v-if="item.coupon_type==2" style="font-size: 11px;color:#FFFFFF;margin-top: 10px"> 折</span>
                </div>
                <span class="money-font" v-if="item.least_cost!==0&&item.coupon_type==1">满{{item.least_cost}}元使用</span>
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
            <div class="ticket-icon" v-show="money!==''&&nowIndex!==index&&max_coupon_dis_amount>=item.least_cost&&item.use_status==true"
                 @click="whether(item,index)"></div>
            <img class="ticket-img" src="/static/gou.png" @click="isImage" v-show="nowIndex==index" alt="logo">
            <img src="/static/nodisable@3x.png" v-show="item.least_cost>=max_coupon_dis_amount||item.use_status!=true" class="disable-img" alt="logo">
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
    <!--支付异常弹出框-->
    <div class="pay-mask" v-if="payError" catchtouchmove="preventTouchMove">
      <div class="pay-dialog" v-if="payError">
        <div class="container">
          <img class="container-img" src="/static/error@3x.png">
          <div class="pay-title">支付异常，需重新发起支付</div>
        </div>
        <div class="pay-footer">
          <div class="btn-confirm" @click="newPay">重新支付</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";

export default {
  data() {
    return {
      payError: false,
      res: [],
      disabled: false,
      errorCode: null,
      money: "",//输入金额
      code: "",
      hiddenModal: false, //弹出框显隐
      showError: false,//优惠码错误码显隐
      name: "",
      phoneNumber: "",
      isHide: "", //标题显隐
      error_msg: "",
      errorMsg: false,
      isHideOnSave: "", //优惠卷显隐
      remarks: "",
      showErrorPhone: false, //联系电话号码错误
      showErrorTitle: false,
      showModal: "", //底部优惠卷显隐
      show: "", //添加优惠券显隐
      isShowImg: false,
      isShowCircle: true, //圆是默认出现
      nowIndex: null,
      is_use_points: 0,
      coupon_detail_id: 0,
      max_coupon_dis_amount: null,
      pay_amount: null,
      coupon_dis_amount: null,
      isShowMoney: false,
      isShowDiscount: false,
      coupon: 0, //保存优惠券id
      pay_way: "",//支付方式
      trade_id: "",
      iCount: "",
      queryTradecount: 0,
      timer: "",
      discountNum:'',//折扣
      coupon_type:null
    };
  },
  computed: {},
  //监听输入金额值的变化
  watch: {
    money: function() {
      //定时器
      clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        let res = await this.$HTTP.post(this.HOST + "/api/quickpay/preorder", {
          store_id: 49,
          bill_amount: this.money,
          is_use_points: this.is_use_points,
          coupon_detail_id: this.coupon_detail_id
        });
        this.max_coupon_dis_amount = res.data.result.max_coupon_dis_amount;
        let res1 = await this.$HTTP.post(this.HOST + "/api/quickpay/coupons", {
          store_id: 49
        });
        let that = this;
        let arr1 = res1.data.result.filter(function(s) {
          return that.max_coupon_dis_amount >= s.least_cost;
        });
        let arr5 = arr1.filter(function(s) {
          return s.use_status == true;
        });
        let arr2 = res1.data.result.filter(function(s) {
          return !(that.max_coupon_dis_amount >= s.least_cost);
        });
        let arr3 = res1.data.result.filter(function(s) {
          return s.use_status == false;
        });
        let arr4 = arr5.concat(arr2);
        this.res = arr4.concat(arr3);
      }, 500);
    }
  },
  components: {},
  async created() {
    await this.isLogin();
    await this.payWay();
    await this.memberType();
    await this.accredit();
    await this.isOnSale();
  },
  methods: {
    // 判断页面是在支付宝页面还是微信页面
    payWay() {
      var browser = navigator.userAgent.toLowerCase();
      if (browser.match(/Alipay/i) == "alipay") {
        this.pay_way = "alipay";
        console.log('这是支付宝浏览器')
      } else if (browser.match(/MicroMessenger/i) == "micromessenger") {
        this.pay_way = "wx";
        console.log('这是微信浏览器')
      } else {
        console.log("其它浏览器");
      }
    },
    async newPay() {
      this.payError = false;
      let res = await this.$HTTP.post(this.HOST + "/api/pay/create", {
        pay_way: this.pay_way,
        trade_id: this.trade_id
      });
      if (res.data.error_code == 0) {
        let data = res.data.result.pay_data;
        this.weixinPay(data);
      } else {
        this.errorMsg = true;
        this.isHide = false;
        this.error_msg = res.data.error_msg;
        setTimeout(() => {
          this.errorMsg = false;
          this.isHide = true;
        }, 2000);
      }
    },
    //点击键盘确定
    async makeSure() {
      let res = await this.$HTTP.post(this.HOST + "/api/quickpay/save/order", {
        store_id: 49,
        bill_amount: this.money,
        is_use_points: 0,
        coupon_detail_id: this.coupon,
        remarks: this.remarks
      });
      let resCreate = await this.$HTTP.post(this.HOST + "/api/pay/create", {
        trade_id: res.data.result.trade_id,
        pay_way: this.pay_way
      });
      this.trade_id = res.data.result.trade_id;
      // this.payError=true
      let data = resCreate.data.result.pay_data;
      await this.weixinPay(data);
    },
    weixinPay: function(data) {
      var vm = this;
      if (typeof WeixinJSBridge == "undefined") {
        //微信浏览器内置对象。参考微信官方文档
        if (document.addEventListener) {
          document.addEventListener(
            "WeixinJSBridgeReady",
            vm.onBridgeReady(data),
            false
          );
        } else if (document.attachEvent) {
          document.attachEvent("WeixinJSBridgeReady", vm.onBridgeReady(data));
          document.attachEvent("onWeixinJSBridgeReady", vm.onBridgeReady(data));
        }
      } else {
        vm.onBridgeReady(data);
      }
    },
    /**
     * @method 支付费用方法
     * @param data:后台返回的支付对象,(详情微信公众号支付API中H5提交支付);
     */
    onBridgeReady: function(data) {
      var vm = this;
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: data.appId, //公众号名称，由商户传入
          timeStamp: data.timeStamp, //时间戳，自1970年以来的秒数
          nonceStr: data.nonceStr, //随机串
          package: data.package,
          signType: data.signType, //微信签名方式：
          paySign: data.paySign //微信签名
        },
        async function(res) {
          // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          if (res.err_msg == "get_brand_wcpay_request：ok") {
            await Toast.loading({
              mask: true,
              message: "支付中",
              duration: 5000
            });
            vm.iCount = setInterval(function() {
              vm.query();
            }, 1000);
          } else {
            console.log(vm.errorMsg);
            vm.errorMsg = true;
            console.log(1);
          }
        }
      );
    },
    query() {
      this.$HTTP
        .post(this.HOST + "/api/pay/query", { trade_id: this.trade_id })
        .then(res => {
          this.queryTradecount++;
          console.log(this.queryTradecount);
          if (res.data.error_code == 3) {
            // for(select_num=0;select_num>=5;select_num++){
            if (this.queryTradecount >= 5) {
              clearInterval(this.iCount);
              this.payError = true;
            }
            // }
          } else if (res.data.error_code == 2) {
            clearInterval(this.iCount);
            this.payError = true;
          } else if (res.data.error_code == 0) {
            this.$router.push("/payFinish");
          }
        })
        .catch(error => {
          clearInterval(this.iCount);
        });
    },
    //点击取消弹出框消失
    cancel() {
      this.show = false;
    },
    async confirm() {
      let res = await this.$HTTP.post(this.HOST + "/api/coupon/sn/change", {
        code: this.code
      });
      if (res.data.error_code == 1) {
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 2000);
      } else {
        this.show = false;
        let res = await this.$HTTP.post(this.HOST + "/api/quickpay/coupons", {
          store_id: 49
        });
        this.res = res.data.result;
      }
    },
    //点击添加优惠券弹出框
    addDiscount() {
      this.show = true;
    },
    //点击不使用优惠券底部弹出框消失
    async noUse() {
      this.showModal = false;
      this.coupon_detail_id = 0;
      let res = await this.$HTTP.post(this.HOST + "/api/quickpay/preorder", {
        store_id: 49,
        bill_amount: this.money,
        is_use_points: 0,
        coupon_detail_id: 0
      });
    },
    //点击圆隐藏圆显示图片
    async whether(item, index) {
     this.coupon_type=item.coupon_type
      this.nowIndex = index;
      setTimeout(() => {
        this.showModal = false;
      }, 1000);
      this.coupon = item.coupon_detail_id;
      let res = await this.$HTTP.post(this.HOST + "/api/quickpay/preorder", {
        store_id: 49,
        bill_amount: this.money,
        is_use_points: 0,
        coupon_detail_id: item.coupon_detail_id
      });
      this.isShowMoney = true;
      this.isShowDiscount = true;
      this.pay_amount = Number(res.data.result.pay_amount).toFixed(2);
      this.coupon_dis_amount = Number(
        res.data.result.coupon_dis_amount
      ).toFixed(2);
      this.discountNum=  Math.ceil(res.data.result.pay_amount/res.data.result.max_coupon_dis_amount*10)
    },
    //点击图片隐藏图片
    isImage(e) {
      this.nowIndex = null;
     console.log(e)
    },
    //点击底部弹出优惠券框
    isShowModal() {
      if(this.money==''){
        this.showModal = false;
      }else{
        this.showModal = true;
      }
    },
    clearValue() {
      this.remarks = "";
    },
    //判断是否登陆
    async isLogin() {
      let that = this;
      await this.$HTTP
        .post(this.HOST + "/api/check/login", { store_id: 49 })
        .then(function(res) {})
        .catch(function(error) {
          that.errorCode = error.response.status;
        });
    },
    //拿到错误码401，让用户授权
    async accredit() {
      if (this.errorCode === 401) {
        let res = await this.$HTTP.post(this.$ADDRESS + "/api/auth", {
          store_id: 49
        });
        window.location.href = res.data.result;
      }
    },
    //是否显示横条
    async memberType() {
      let res = await this.$HTTP.post(this.HOST + "/api/card/my");
      localStorage.setItem('balance',res.data.result.balance)
      localStorage.setItem('level_id',res.data.result.level_id)
      localStorage.setItem('no',res.data.result.no)
      localStorage.setItem('points',res.data.result.points)
      if (res.data.result == null) {
        this.isHide = true;
      } else {
        this.isHide = false;
        this.$router.push("/ToPay");
      }
    },

    async sure() {
      const phoneTest = new RegExp("^1[3|4|5|7|8][0-9]{9}$");
      if (this.name == "" && this.phoneNumber == "") {
      } else {
        if (
          this.name !== "" &&
          this.phoneNumber !== "" &&
          phoneTest.test(this.phoneNumber)
        ) {
          let res = await this.$HTTP.post(this.HOST + "/api/card/create/fast", {
            name: this.name,
            tel: this.phoneNumber
          });
          if (res.data.error_code == 0) {
            this.$router.push("/ToPay");
            Toast.success("注册成功");
          } else {
            this.showErrorTitle = true;
            setTimeout(() => {
              this.showErrorTitle = false;
            }, 2000);
          }
        } else {
          this.showErrorPhone = true;
          setTimeout(() => {
            this.showErrorPhone = false;
          }, 2000);
        }
      }
    },
    //点击关闭按钮关闭弹出框
    close() {
      this.hiddenModal = false;
    },
    isShow() {
      this.hiddenModal = true;
    },
    //是否显示优惠卷
    async isOnSale() {
      let res = await this.$HTTP.post(this.HOST + "/api/quickpay/coupons", {
        store_id: 49
      });
      this.res = res.data.result;

      if (res.data.result) {
        this.isHideOnSave = true;
      } else {
        this.isHideOnSave = false;
      }
    },
    //处理按键
    _handleKeyPress(e) {
      let num = e.target.dataset.num;
      //不同按键处理逻辑
      switch (String(num)) {
        //小数点
        case ".":
          this._handleDecimalPoint();
          break;
        //删除键
        case "D":
          this._handleDeleteKey();
          break;
        //确认键
        case "S":
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
      if (this.money.indexOf(".") > -1) return false;
      //如果小数点是第一位，补0
      if (!this.money.length) this.money = "0.";
      //如果不是，添加一个小数点
      else this.money = this.money + ".";
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
      if (S.indexOf(".") > -1 && S.substring(S.indexOf(".") + 1).length < 2)
        this.money = S + num;
      //没有小数点
      if (!(S.indexOf(".") > -1)) {
        //如果第一位是0，只能输入小数点
        if (num == 0 && S.length == 0) this.money = "0.";
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
        alert("您目前未输入!");
        return false;
      }
      //将 8. 这种转换成 8.00
      if (S.indexOf(".") > -1 && S.indexOf(".") == S.length - 1)
        S = Number(S.substring(0, S.length - 1)).toFixed(2);
      //保留两位
      S = Number(S).toFixed(2);
      this.$emit("confirmEvent", S);
    }
  }
};
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
      left: 1rem;
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
  & .error {
    background-color: #dd2726;
    line-height: 1.5em;
    text-align: center;
    color: #ebf1f5;
    font-size: 0.75rem;
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
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 0 0.75rem 0;
    border-bottom: 1px solid #f0f0f0;
    & .center-font {
      width: 3.25rem;
      font-size: 0.8rem;
    }
    & .discount-num{
      font-weight: bold;
      font-size: 0.8rem;
      color: #dd2726;
    }
    & .center-num {
      font-weight: bold;
      font-size: 0.8rem;
      color: #dd2726;
    }
    & .centerNum1{
      margin-right: 2.5rem;
    }
    & .center-logo {
      width: 0.425rem;
      height: 0.75rem;
    }
  }
  & .cope {
    display: flex;
    padding: 0.75rem 0 0.75rem 0;
    border-bottom: 1px solid #f0f0f0;
    & .cope-font {
      width: 65px;
      font-size: 0.8rem;
    }
    & .cope-num {
      font-size: 16px;
      color: #e51c23;
      margin-left: 43px;
      font-weight: bold;
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
            margin-left: 95px;
          }
        }
        & .disable {
          background-color: #d5dade !important;
        }
        & .text-danger {
          background-color: #d5dade !important;
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
              height: 3px;
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
              height: 3px;
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
              height: 3px;
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
          top: 35px;
        }
        & .ticket-img {
          width: 20px;
          height: 20px;
          position: absolute;
          right: 17px;
          top: 35px;
        }
        & .disable-img {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 2rem;
          height: 2rem;
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
  & .error {
    background-color: #dd2726;
    line-height: 30px;
    text-align: center;
    color: #ebf1f5;
    font-size: 15px;
  }
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
      margin-left: 25px;
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
      margin-top: 40px;
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
        border: none ;
        outline: none ;
      }
    }
  }
}

/*支付异常弹出框样式*/
.pay-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  z-index: 9000;
  & .pay-dialog {
    border-radius: 5px;
    height: 177px;
    width: 280px;
    overflow: hidden;
    position: fixed;
    top: 50%;
    left: 0;
    z-index: 9999;
    background: white;
    margin: -160px 50px;
    & .container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      & .container-img {
        width: 45px;
        height: 45px;
        padding: 20px;
      }
      & .pay-title {
        font-size: 16px;
        color: #12263c;
      }
    }
    & .pay-footer {
      & .btn-confirm {
        margin-top: 20px;
        border-top: 1px solid #f0f0f0;
        text-align: center;
        line-height: 40px;
        color: #d43b33;
        font-size: 16px;
      }
    }
  }
}

/*添加优惠券弹出框*/
.add-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  z-index: 9000;
  & .error {
    background-color: #dd2726;
    line-height: 30px;
    text-align: center;
    color: #ebf1f5;
    font-size: 15px;
  }
  & .add-dialog {
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
    & .container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      & .add-title {
        padding: 15px;
        font-size: 18px;
        color: #000000;
      }
    }
    & .add-font {
      display: flex;
      justify-content: center;
      align-items: center;

      & .add-input {
        width: 240px;
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
    & .add-footer {
      margin-top: 26px;
      display: flex;
      flex-direction: row;
      height: 46px;
      border-top: 1px solid #dedede;
      line-height: 46px;
      & .btn-cancel {
        width: 50%;
        text-align: center;
        font-size: 18px;
        color: #515151;
        background-color: #fbfafc;
      }
      & .btn-confirm {
        width: 50%;
        text-align: center;
        font-size: 18px;
        color: #e66363;
        background-color: #dd2726;
      }
    }
  }
}
</style>
