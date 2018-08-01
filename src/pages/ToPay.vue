<template>
  <div style="height: 100%;">
    <div class="mainer">
      <!--第一个card-->
      <div class="error" v-if="showErrorValue">小于应付金额,请更换储值方式</div>
      <div class="error" v-if="timeError">赠送金额{{limit_time}}小时候可用,请更换储值方案</div>
      <div class="error" v-if="showErrorMsg">{{error}}</div>
      <div class="header-card">
        <div class="pay-money">
          <div class="money">
            <span class="header-money">消费金额</span>
            <input class="header-num" autofocus="autofocus" @input="change" type="text" v-model="value">
          </div>
          <div @click="clickFont">
            <span class="header-describe" v-show="isShowFont">不参与优惠金额</span>
            <input class="header-input" @input="change" autofocus="autofocus" type="text" v-show="isShowInput" v-model='inputValue'>
          </div>
        </div>
        <div class="vip-discount" v-show="member_is_open">
          <div class="vip-font">会员折扣</div>
          <div class="discount-num" v-show="isShow&&value!=''">{{member_dis_amount}}</div>
          <div class="discount-font" v-show="member_dis_amount!=computing&&isShow&&value!=''">({{member_dis}}折)</div>
        </div>
        <div class="discount-coupon" @click="isShowModal">
          <div class="discount-container">
            <span class="discount-font">优惠券</span>
            <div v-show="isMoney" style="margin-left:1.25rem ">
              <span class="discount-num" v-show="coupon_type==2">{{discountNum}}折</span>
              <span class="center-num" :class="{centerNum1:coupon_type!==2}">减{{coupon_dis_amount}}</span>
            </div>
            <span class="coupon-mun" v-show="isCoupon&&member_dis_amount!=computing&&value!=''">{{arrNum}}张优惠券可用</span>
            <span class="coupon-mun" v-show="isCoupon&&member_dis_amount==computing&&value!=''">{{computing}}</span>
          </div>
          <div class="discount-icon">
            <img class="logo" src="/static/logo2@3x.png">
          </div>
        </div>
        <div class="integration-discount" v-show="discount_is_open">
          <div class="integration-container">
            <span class="integration-font">积分折扣</span>
            <span class="integration-num" v-show="isIntegral&&value!=''">{{points_dis_amount}}</span>
            <span class="discount-font" v-show="isIntegral&&member_dis_amount!=computing&&value!=''">(使用{{use_points}}积分)</span>
          </div>
          <div class="integration-icon" @click="ImgLog" v-show="value!=''">
            <img class="integration-logo" src="/static/xuanzhong@3x.png" v-show="isShowXuanZhong">
            <img class="integration-logo" src="/static/weizhong-@3x.png" v-show="!isShowXuanZhong">
          </div>

        </div>
        <div class="amount-payable">
          <div class="amount-font">应付金额</div>
          <div class="amount-num" v-show="value!=''">{{pay_amount}}</div>
        </div>
      </div>
      <!--第二个card-->
      <div class="center-card">
        <div class="wx-pay">
          <div class="wx-left">
            <img class="left-logo" src="/static/wx@3x.png" alt="logo" v-show="pay_way=='微信支付'">
            <img class="left-logo" src="/static/zfb@3x.png" alt="logo" v-show="pay_way=='支付宝支付'">
            <span class="wx-font">{{pay_way}}</span>
          </div>
          <div class="wx-right" @click='hiddenLogo'>
            <img class="right-logo" src="/static/xuanzhong@3x.png" alt="logo" v-show="isShowLogo&&value!=''">
            <img class="right-logo" src="/static/weizhong-@3x.png" alt="logo" v-show="!isShowLogo||value==''">
          </div>
        </div>
        <div v-show="showModelValue">
          <div class="save-money">
            <div class="save-left">
              <img class="left-logo" src="/static/money@3x.png">
              <span class="save-font">储值金额</span>
              <span class="save-description">当前金额{{balance}}元</span>
            </div>
            <div class="save-right" @click="saveLogo">
              <img class="right-logo" src="/static/weizhong-@3x.png" alt="logo" v-show="!isSaveLogo||value==''">
              <img class="right-logo" src="/static/xuanzhong@3x.png" v-show="isSaveLogo&&value!=''">
            </div>
          </div>
          <div v-for="(item,index) in arrTemplate" :key="index">
            <div class="recharge">
              <div class="recharge-font">冲{{item.amount}}送{{item.gift_amount}}元</div>
              <div class="recharge-icon" @click="switchImg(item,index)">
                <img class="right-logo" alt="logo" src="/static/weizhong-@3x.png" v-show="Index!=index||bShow||value==''">
                <img class="right-logo" src="/static/xuanzhong@3x.png" alt="logo" v-show="Index==index&&aShow&&value!=''">
              </div>
            </div>
            <div class="describe" v-show="Index==index&&cShow&&value!=''">
              <div class="describe-font">到账{{amount+gift_amount}}元，支付后剩余{{sum}}元</div>
            </div>
          </div>
        </div>
        <div class="input-confirm">
          <input class="input" placeholder="添加备注" v-model="remarks"/>
        </div>
      </div>
    </div>
    <div class="footer">
      <button class="button" v-if="value!=''" v-show="member_dis_amount!=computing" @click="createOrder"><span v-show="isShowSymbol&&value!=''">¥</span><span v-show="value!=''">{{moneyValue}}</span>
        {{butDescribe}}
      </button>
      <button class="button-forbidden" v-else v-show="member_dis_amount!=computing" ><span v-show="isShowSymbol&&value!=''">¥</span><span v-show="value!=''">{{moneyValue}}</span>
        {{butDescribe}}
      </button>
      <button class="button" v-show="member_dis_amount==computing">{{computing}}</button>
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
            <div class="ticket-icon" v-show="value!==''&&nowIndex!==index&&max_coupon_dis_amount>=item.least_cost&&item.use_status==true"
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
    name: "ToPay",
    data() {
      return {
        payError:false,
        showErrorMsg:false,
        value: '',
        isShowFont: true,
        isShowInput: false,
        inputValue: '',
        showModal: false,
        res: [],
        max_coupon_dis_amount: 0,
        nowIndex: null,
        arrNum: '',
        isMoney: false,
        isCoupon: false,
        member_is_open: "",
        discount_is_open: "",
        member_dis: null,
        member_dis_amount: null,
        isShow: false,
        use_points: null,
        points_dis_amount: null,
        isIntegral: false,
        pay_amount: null,
        isShowXuanZhong: true,
        coupon_type: null,
        discountNum: '',
        coupon_dis_amount: '',
        balance: "",
        showModelValue: '',
        isShowLogo: '',
        isSaveLogo: '',
        arrTemplate: [],
        pay_way: '',
        pattern:'',
        Index: null,
        amount: '',
        gift_amount: null,
        showErrorValue: false,
        timeError: false,
        moneyValue: null,
        butDescribe: '确认买单',
        isShowSymbol: false,
        aShow: false,
        bShow: true,
        cShow: false,
        sum: null,
        limit_time: null,
        computing: '正在计算中...',
        remarks:'',
        coupon_detail_id:0,
        trade_id:null,
        show: "", //添加优惠券显隐
        showError: false,//优惠码错误码显隐
        code: "",
        queryTradecount: 0,
        id:null

      }
    },
    async created() {
      await this.isMemberDiscount()
      await this.isShowSaveValue()
      await this.payWay()
      await this.getBalance()
    },
    computed: {
      //消费金额减去不参与优惠金额
      monitoringValue() {
        return this.value - this.inputValue
      },
      //是否使用积分
      is_use_points(){
          return  this.isShowXuanZhong? 1 : 0
      }

    },
    methods: {
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
      change() {
        this.member_dis_amount = this.computing
        this.points_dis_amount = this.computing
      },
      switchImg(item, index) {
        this.Index = index
        this.amount = item.amount
        this.gift_amount = item.gift_amount
        this.id=item.id
        this.sum = (item.amount + item.gift_amount + (+this.balance) - (+this.pay_amount)).toFixed(1)
        if (this.Index == index) {
          this.isSaveLogo = false
          this.isShowLogo = false
        }
        if (item.amount + item.gift_amount + (+this.balance) < +this.pay_amount) {
          this.showErrorValue = true
          this.aShow = false
          this.bShow = true
          this.cShow = false
          setTimeout(() => {
            this.showErrorValue = false
          }, 5000)
        } else {
          this.showErrorValue = false
          this.aShow = true
          this.bShow = false
          this.cShow = true
        }
        if (this.limit_time > 0 && this.amount < this.pay_amount) {
          this.timeError = true
          this.showErrorValue = false
          setTimeout(() => {
            this.timeError = false
          }, 5000)
        }
        if (this.Index == index && this.aShow) {
          this.isShowSymbol = true
          this.moneyValue = item.amount
          this.butDescribe = '充值并买单'
        }
      },
      // 判断页面是在支付宝页面还是微信页面
      payWay() {
        var browser = navigator.userAgent.toLowerCase();
        if (browser.match(/Alipay/i) == "alipay") {
          this.pay_way = "支付宝支付";
          this.pattern='alipay'
          console.log('这是支付宝浏览器')
        } else if (browser.match(/MicroMessenger/i) == "micromessenger") {
          this.pay_way = "微信支付";
          this.pattern='wx'
          console.log('这是微信浏览器')
        } else {
          console.log("其它浏览器");
        }
      },
      async getBalance(){
        let res = await this.$HTTP.post(this.HOST + "/api/card/my");
        this.balance=res.data.result.balance
      },
      saveLogo() {
        this.isSaveLogo = true
        if (this.isSaveLogo == true) {
          this.butDescribe="确认买单"
          this.moneyValue = this.pay_amount
          this.isShowLogo = false
          this.aShow = false
          this.bShow = true
          this.cShow = false
        }
      },
      //用微信支付或者支付宝
      hiddenLogo() {
        this.isShowLogo = true
        if (this.isShowLogo == true) {
          this.isSaveLogo = false
          this.aShow = false
          this.bShow = true
          this.cShow = false
          this.isShowSymbol = true
          this.moneyValue = this.pay_amount
          this.butDescribe = '确认买单'
        }
      },
      async isShowSaveValue() {
        let res = await this.$HTTP.post(this.HOST + "api/wallet/tem");
        this.arrTemplate = res.data.result.template
        this.limit_time = res.data.result.limit_time
        if (res.data.result.template.length == 0) {
          this.showModelValue = false
        } else {
          this.showModelValue = true
        }
      },
      ImgLog() {
        this.isShowXuanZhong = !this.isShowXuanZhong
        if (this.isShowXuanZhong == true) {
          let pay_amount = this.pay_amount - this.points_dis_amount;
          this.pay_amount = Number(pay_amount).toFixed(2)
          this.isIntegral = true
        } else {
          this.isIntegral = false
          let pay_amount = +this.pay_amount + (+this.points_dis_amount)
          this.pay_amount = Number(pay_amount).toFixed(2)
        }
      },
      clickFont() {
        this.isShowFont = false
        this.isShowInput = true
      },
      //有没会员折扣
      async isMemberDiscount() {
        let res = await this.$HTTP.post(this.HOST + "api/card/market/dis-config", {
          store_id: 49
        });
        this.member_is_open = res.data.result.card_level_discount.is_open
        this.discount_is_open = res.data.result.card_points_deductible_rule.is_open
      },
      //点击底部弹出优惠券框
      isShowModal() {
        if (this.value == '') {
          this.showModal = false;
        } else {
          this.showModal = true;
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
          bill_amount: this.value,
          is_use_points: 0,
          coupon_detail_id: 0,
        });
      },
      //点击圆隐藏圆显示图片
      async whether(item, index) {
        this.coupon_type = item.coupon_type
        this.nowIndex = index;
        setTimeout(() => {
          this.showModal = false;
        }, 1000);
        let res = await this.$HTTP.post(this.HOST + "/api/quickpay/preorder", {
          store_id: 49,
          bill_amount: this.value,
          is_use_points: this.is_use_points,
          coupon_detail_id: item.coupon_detail_id
        });
        this.coupon_detail_id=item.coupon_detail_id
        this.isCoupon = false
        this.isMoney = true
        this.pay_amount = Number(res.data.result.pay_amount).toFixed(2);
        this.coupon_dis_amount = Number(
          res.data.result.coupon_dis_amount
        ).toFixed(2);
        this.discountNum = Math.ceil(res.data.result.pay_amount / res.data.result.max_coupon_dis_amount * 10)
      },
      //点击图片隐藏圆
      isImage(e) {
        this.nowIndex = null;
        console.log(e)
      },
      //点击底部弹出优惠券框
      isShowModal() {
        if (this.value == '') {
          this.showModal = false;
        } else {
          this.showModal = true;
        }
      },
      //点击底部按钮
      async createOrder(){

        if(this.pattern=="wx"&&this.isShowLogo==true){
          //创建订单
          let res = await this.$HTTP.post(this.HOST + "/api/quickpay/save/order", {
            store_id: 49,
            bill_amount: this.moneyValue,
            is_use_points: this.is_use_points,
            coupon_detail_id: this.coupon_detail_id,
            remarks:this.remarks,
            no_dis_amount:this.inputValue
          });
          this.trade_id=res.data.result.trade_id
          //发起支付
          let startRes = await this.$HTTP.post(this.HOST +"/api/pay/create", {
            trade_id:this.trade_id,
            pay_way:this.pattern
          });
          if(startRes.data.error_code==1){
            this.showErrorMsg=true
            this.error=startRes.data.error_msg
            setTimeout(()=>{
              this.showErrorMsg=false
            },2000)
          }
          let data = startRes.data.result.pay_data;
          this.weixinPay(data)
        }else if(this.isSaveLogo!=true&&this.isSaveLogo!=true){
          let res = await this.$HTTP.post(this.HOST + "/api/wallet/fund", {
            tem_id:this.id,
            store_id:49
          });
        }
      },
      weixinPay(data) {
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
              console.log(vm.errorMsg);
              vm.errorMsg = true;
              console.log(1);
            } else {
              await Toast.loading({
                mask: true,
                message: "支付中",
                duration: 60000
              });
              vm.iCount = setInterval(function() {
                vm.query();
              }, 1000);

            }
          }
        );
      },
      query() {
        this.$HTTP
          .post(this.HOST + "/api/pay/query",{trade_id: this.trade_id })
          .then(res => {
            this.queryTradecount++;
            if (res.data.error_code == 3) {
              if (this.queryTradecount >= 60) {
                clearInterval(this.iCount);
                setTimeout(()=>{
                  this.payError = true;
                },6000)
              }
            } else if (res.data.error_code == 2) {
              clearInterval(this.iCount);
              console.log(1)
              this.payError = true;
            } else if (res.data.error_code == 0) {
               Toast.clear();
              clearInterval(this.iCount);
              this.$router.push("/paySuccess");
            }
          })
          .catch(error => {
            clearInterval(this.iCount);
          });
      },
    },

    watch: {
      monitoringValue: function () {
        //定时器
        clearTimeout(this.timer);
        this.timer = setTimeout(async () => {
          let res = await this.$HTTP.post(this.HOST + "/api/quickpay/preorder", {
            store_id: 49,
            bill_amount: this.value,
            is_use_points: this.is_use_points,
            coupon_detail_id: this.coupon_detail_id,
            no_dis_amount: this.inputValue
          });
          this.max_coupon_dis_amount = res.data.result.max_coupon_dis_amount;
          let res1 = await this.$HTTP.post(this.HOST + "/api/quickpay/coupons", {
            store_id: 49
          });
          let that = this;
          let arr1 = res1.data.result.filter(function (s) {
            return that.max_coupon_dis_amount >= s.least_cost;
          });
          let arr5 = arr1.filter(function (s) {
            return s.use_status == true;
          });
          let arr2 = res1.data.result.filter(function (s) {
            return !(that.max_coupon_dis_amount >= s.least_cost);
          });
          let arr3 = res1.data.result.filter(function (s) {
            return s.use_status == false;
          });
          if (true) {
            this.isShow = true
            this.member_dis = res.data.result.member_dis
            this.member_dis_amount = Number(
              -res.data.result.member_dis_amount
            ).toFixed(2);
          }
          if (true) {
            this.isIntegral = true
            this.use_points = res.data.result.use_points
            this.points_dis_amount = Number(
              -res.data.result.points_dis_amount
            ).toFixed(2);
          }
          this.pay_amount = Number(res.data.result.pay_amount).toFixed(2);

          let arr4 = arr5.concat(arr2);
          this.res = arr4.concat(arr3);
          this.arrNum = res1.data.result.length - arr3.length - arr2.length
          if (+this.pay_amount > +this.balance) {
            this.isShowLogo = true
          } else {
            this.isShowLogo = false
            this.isSaveLogo = true
          }
          if (this.isShowLogo) {
            this.isSaveLogo = false
          }
          if (this.isMoney == false) {
            this.isCoupon = true
          } else {
            this.isMoney = false
            this.isCoupon = true
          }
          if (this.isShowLogo == true) {
            this.isShowSymbol = true
            this.moneyValue = this.pay_amount
            this.butDescribe = '确认买单'
          } else {
            this.isShowSymbol = true
            this.moneyValue = this.pay_amount
            this.butDescribe = '充值并买单'
          }
          if(this.isSaveLogo==true){
            this.butDescribe="确认买单"
          }
        },1000);
      },
    },
  }
</script>

<style lang="scss" scoped>
  .mainer {
    overflow: auto;
    height: 100%;
    & .error {
      background-color: #dd2726;
      line-height: 1.5rem;
      text-align: center;
      color: #ebf1f5;
      font-size: 0.75rem;
    }
    /*第一card样式*/
    & .header-card {
      background-color: white;
      margin: 0.5rem;
      border-radius: 0.25rem;
      & .pay-money {
        display: flex;
        width: 16.5rem;
        line-height: 2.2rem;
        height: 2.2rem;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.5rem;
        & .money {
          & .header-money {
            width: 3.15rem;
            font-size: 0.8rem;
            font-family: PingFang-SC-Medium;
            color: rgba(18, 38, 60, 1);
          }
          & .header-num {
            padding-left: 0.5rem;
            width: 7.5rem;
            font-size: 0.95rem;
            border: none;
            outline: medium;
            font-family: PingFang-SC-Bold;
            color: rgba(212, 59, 51, 1);
          }
        }
        & .header-describe {
          font-size: 0.7rem;
          color: #586c94;
        }
        & .header-input {
          color: #12263c;
          width: 3.5rem;
          border: none;
          outline: medium;
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
          font-family: PingFang-SC-Medium;
          color: rgba(18, 38, 60, 1);
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
        width: 16.5rem;
        line-height: 2.2rem;
        height: 2.2rem;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.5rem;
        & .discount-container {
          display: flex;
          & .discount-font {
            width: 3rem;
            font-size: 0.8rem;
            font-family: PingFang-SC-Medium;
            color: rgba(18, 38, 60, 1);
          }
          & .discount-num {
            font-weight: bold;
            font-size: 0.8rem;
            color: #dd2726;
          }
          & .center-num {
            font-weight: bold;
            font-size: 0.8rem;
            color: #dd2726;
          }
          & .centerNum1 {
            margin-right: 2.5rem;
          }
          & .coupon-mun {
            padding-left: 1.1rem;
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
        width: 16.5rem;
        line-height: 2.2rem;
        height: 2.2rem;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.5rem;
        & .integration-container {
          & .integration-font {
            font-size: 0.8rem;
            font-family: PingFang-SC-Medium;
            color: rgba(18, 38, 60, 1);
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
          font-size: 0.95rem;
          font-family: PingFang-SC-Bold;
          color: rgba(212, 59, 51, 1);
          padding-left: 1rem;
        }
      }
    }
    /*第二个card样式*/
    & .center-card {
      background-color: white;
      margin: 0.5rem 0.5rem 3.8rem 0.5rem;
      border-radius: 0.25rem;
      & .wx-pay {
        display: flex;
        width: 16.5rem;
        line-height: 2.2rem;
        height: 2.2rem;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.5rem;
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
      & .save-money {
        display: flex;
        width: 16.5rem;
        line-height: 2.2rem;
        height: 2.2rem;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.5rem;
        & .save-left {
          display: flex;
          justify-content: center;
          align-items: center;
          & .left-logo {
            width: 0.95rem;
            height: 0.95rem;
          }
          & .save-font {
            margin-left: 0.5rem;
            font-size: 0.8rem;
            color: #333333;
          }
          & .save-description {
            margin-left: 0.5rem;
            font-size: 0.7rem;
            color: #9eaab6;
          }
        }
        & .save-right {
          & .right-logo {
            width: 0.8rem;
            height: 0.8rem;
          }
        }
      }
      & .recharge {
        display: flex;
        width: 16.5rem;
        line-height: 2.2rem;
        height: 2.2rem;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.5rem;
        & .recharge-font {
          padding-left: 1.4rem;
          font-size: 0.8rem;
          color: #333333;
        }
        & .recharge-icon {
          & .right-logo {
            width: 0.8rem;
            height: 0.8rem;
          }
        }
      }
      & .describe {
        line-height: 1.15rem;
        height: 1.15rem;
        background: #fdf5e1;
        & .describe-font {
          margin-left: 1.9rem;
          color: #eabd08;
          font-size: 0.7rem;
        }
      }
    }
    & .input-confirm {
      border-top: 1px solid #f0f0f0;
      line-height: 2.3rem;
      height: 2.3rem;
      margin-left: 20px;
      outline: none;
      overflow: hidden;
      & .input {
        width: 100%;
        border: none;
        outline: medium;
        color: #333333;;
        font-size: 0.8rem;
      }
      input::placeholder {
        color: #b2b2b2;
        font-size: 0.8rem;
      }
    }
  }
  .footer {
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
      outline: none;
      font-family:PingFang-SC-Medium;
      border: none;
    }
    & .button-forbidden {
      height: 2.2rem;
      width: 100%;
      font-family:PingFang-SC-Medium;
      color:rgba(255,147,141,0.5);
      font-size: 0.8rem;
      background: #dd2726;
      border-radius: 0.25rem;
      outline: none;
      border: none;
    }
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
      height: 19.45rem;
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
        height: 2.25rem;
        width: 100%;
        align-items: center;
        & .header-add {
          font-size: 0.7rem;
          color: #e51c23;
          padding-left: 0.5rem;
        }
        & .header-select {
          font-size: 0.85rem;
          color: #000000;
        }
        & .header-nonUse {
          font-size: 0.7rem;
          color: #586c94;
          padding-right: 1.25rem;
        }
      }
      & .bottom-footer {
        height: 17.2rem;
        overflow: auto;
        width: 100%;
        background-color: #ebf1f5;
        & .footer-container {
          display: flex;
          margin: 0.6rem 0.5rem 0.5rem 0.5rem;
          height: 5rem;
          background-color: #ffffff;
          position: relative;
          & .ticket {
            width: 5rem;
            height: 100%;
            & .ticket-fon {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              margin-top: -4rem;
              & .ticket-money {
                color: #ffffff;
                font-size: 1.3rem;
              }
              & .money-font {
                color: #ffffff;
                font-size: 0.65rem;
              }
            }

            & .circle {
              width: 0.5rem;
              height: 0.5rem;
              border-radius: 50%;
              background-color: #ffffff;
              margin-left: 4.75rem;
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
            margin-left: 1rem;
            & .ticket-container1 {
              & .spot {
                display: inline-block;
                margin-top: 1rem;
                background-color: #888888;
                border-radius: 2.5rem;
                width: 0.15rem;
                height: 0.15rem;
              }
              & .collect-money {
                font-size: 0.6rem;
                color: #888888;
              }
              & .collect {
                font-size: 0.6rem;
                color: #e51c23;
              }
            }
            & .ticket-container2 {
              & .spot {
                display: inline-block;
                margin-top: 1rem;
                background-color: #888888;
                border-radius: 2.5rem;
                width: 0.15rem;
                height: 0.15rem;
              }
              & .time {
                font-size: 0.6rem;
                color: #888888;
              }
            }
            & .ticket-container3 {
              & .spot {
                display: inline-block;
                margin-top: 1rem;
                background-color: #888888;
                border-radius: 2.5rem;
                width: 0.15rem;
                height: 0.15rem;
              }
              & .week {
                font-size: 0.6rem;
                color: #888888;
              }
            }
          }
          & .ticket-icon {
            width: 0.75rem;
            height: 0.75rem;
            border-radius: 50%;
            border: 1px solid #b2b2b2;
            position: absolute;
            right: 1rem;
            top: 1.75rem;
          }
          & .ticket-img {
            width: 1rem;
            height: 1rem;
            position: absolute;
            right: 0.85rem;
            top: 1.75rem;
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
      border-radius: 0.25rem;
      height: 8.85rem;
      width: 14rem;
      overflow: hidden;
      position: fixed;
      top: 50%;
      left: 0;
      z-index: 9999;
      background: white;
      margin: -8rem 2.5rem;
      & .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        & .container-img {
          width: 2.25rem;
          height: 2.25rem;
          padding: 1rem;
        }
        & .pay-title {
          font-size: 0.8rem;
          color: #12263c;
        }
      }
      & .pay-footer {
        & .btn-confirm {
          margin-top: 1rem;
          border-top: 1px solid #f0f0f0;
          text-align: center;
          line-height: 2rem;
          color: #d43b33;
          font-size: 0.8rem;
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
    z-index: 999999;
    & .error {
      background-color: #dd2726;
      line-height: 1.5rem;
      text-align: center;
      color: #ebf1f5;
      font-size: 0.75rem;
    }
    & .add-dialog {
      border-radius: 0.25rem;
      height: 8.85rem;
      width: 14rem;
      overflow: hidden;
      position: fixed;
      top: 50%;
      left: 0;
      z-index: 9999;
      background: white;
      margin: -6rem 3.5rem;
      & .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        & .add-title {
          padding: 0.75rem;
          font-size: 0.9rem;
          color: #000000;
        }
      }
      & .add-font {
        display: flex;
        justify-content: center;
        align-items: center;
        & .add-input {
          width: 12rem;
          height: 2.2rem;
          border: 1px solid #e7e7e7;
          font-size: 0.8rem;
          outline: medium;
          padding-left: 1rem;
          border-radius: 0.25rem;
          background-color: #fbfafc;
        }
        input::placeholder {
          color: #b2b2b2;
          font-size: 0.8rem;
        }
      }
      & .add-footer {
       overflow: hidden;
        display:flex;
        margin-top: 1.9rem;
        flex-direction: row;
        height: 2.3rem;
        border-top: 1px solid #dedede;
        line-height: 2.3rem;
        & .btn-cancel {
          width: 50%;
          text-align: center;
          font-size: 0.9rem;
          color: #515151;
          background-color: #fbfafc;
        }
        & .btn-confirm {
          overflow: hidden;
          outline: none;
          width: 50%;
          text-align: center;
          font-size: 0.9rem;
          color: #e66363;
          background-color: #dd2726;
        }
      }
    }
  }
</style>
