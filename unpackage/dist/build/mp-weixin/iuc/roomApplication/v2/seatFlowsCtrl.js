(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["iuc/roomApplication/v2/seatFlowsCtrl"],{"22f8":function(t,e,i){},4791:function(t,e,i){"use strict";i.r(e);var a=i("7471"),s=i.n(a);for(var n in a)"default"!==n&&function(t){i.d(e,t,function(){return a[t]})}(n);e["default"]=s.a},6581:function(t,e,i){"use strict";i.r(e);var a=i("f714"),s=i("4791");for(var n in s)"default"!==n&&function(t){i.d(e,t,function(){return s[t]})}(n);i("8ce7");var o,r=i("f0c5"),u=Object(r["a"])(s["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],o);e["default"]=u.exports},7471:function(t,e,i){"use strict";(function(t){function i(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{},s=Object.keys(i);"function"===typeof Object.getOwnPropertySymbols&&(s=s.concat(Object.getOwnPropertySymbols(i).filter(function(t){return Object.getOwnPropertyDescriptor(i,t).enumerable}))),s.forEach(function(e){a(t,e,i[e])})}return t}function a(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s={onLoad:function(e){var a=this;t.post("/api/roomApp/v1/GetRoomAndTeacher",{},function(t){a.assistInfo=i({},a.assistInfo,t)}),e.create?(this.displayTimeline=!1,t.getStorage({key:"seatid",success:function(e){var i=e.data;t.post("/api/seatApp/v1/Applicate",{id:i},function(e){if(e.success){for(var i in a.io=e,a.io.data.OwnerRoles)if("老师"===a.io.data.OwnerRoles[i]){a.isStudent=!1;break}}else t.showMessage(e.msg,1)})}})):t.getStorage({key:"jmpInfo",success:function(e){t.post("/api/workflow/LoadInstance",i({},e.data,{detail:!0}),function(t){for(var e in a.io=t,a.io.data.OwnerRoles)if("老师"===a.io.data.OwnerRoles[e]){a.isStudent=!1;break}if(5===a.io.intstanceState)for(var i in a.io.allSteps)if(0===a.io.allSteps[i].status){a.io.allSteps[i-1].status=30,a.io.timelines[0].steps[0].State=4;break}})}})},methods:{formValidate:function(){var t=[];if(this.isStudent&&"00000000-0000-0000-0000-000000000000"===this.io.data.GuideTeacherId&&"填写申请表"===this.io.currentStep&&t.push("必须选择指导老师"),void 0!==this.upLoad.Telephone&&"填写申请表"===this.io.currentStep){var e=new RegExp("^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$");!1===e.test(this.upLoad.Telephone)&&t.push("请输入正确的电话号码")}return t},onSubmit:function(e){var a=this;e&&(this.io.data[e.Field]=e.Value),this.io.shouldUpload.forEach(function(t){a.upLoad[t]=a.io[t]||a.io.data[t]});var s=this.formValidate();s.length>0?t.showMessage(s[0]):t.post("/api/workflow/SubmitInstance",i({},this.upLoad),function(e){e.success?t.showMessage("提交成功",1,"","success"):t.showMessage(e.msg)})},selectTeacher:function(t){var e=this.assistInfo.teachers[t.detail.value];this.io.data.GuideTeacherId=e.ID,this.assistInfo.guideTeacherName=e.RealName},selectSeat:function(t){var e=this.assistInfo.seats[t.detail.value];this.io.data.SeatId=e.ID,this.io.data.SeatInfo.seat=e},selectDateTime:function(t){t&&"w"!==t||!this.io.isMyStep||(this.showPicker=!this.showPicker)},confirmDateTime:function(t){this.io.data.StartDate=t.value[0],this.io.data.EndDate=t.value[1],this.selectDateTime()},foldUp:function(){this.displayTimeline=!this.displayTimeline}},data:function(){return{io:{allSteps:[],data:{SeatInfo:{building:{},room:{},seat:{}}},fieldAccess:{},intstanceState:"",isMyStep:!1,shouldUpload:[],submitBtns:[],timeLines:[]},assistInfo:{buildings:[],rooms:[],seats:[],teachers:[],roomtemp:[],roomIndex:[0,0],guideTeacherName:"请选择指导老师"},displayTimeline:!0,upLoad:[],roomDic:{},seatsDic:{},showPicker:!1,isStudent:!0}}};e.default=s}).call(this,i("543d")["default"])},"8ce7":function(t,e,i){"use strict";var a=i("22f8"),s=i.n(a);s.a},"9e36":function(t,e,i){"use strict";(function(t){i("965d"),i("921b");a(i("66fd"));var e=a(i("6581"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("543d")["createPage"])},f714:function(t,e,i){"use strict";var a,s=function(){var t=this,e=t.$createElement;t._self._c},n=[];i.d(e,"b",function(){return s}),i.d(e,"c",function(){return n}),i.d(e,"a",function(){return a})}},[["9e36","common/runtime","common/vendor"]]]);