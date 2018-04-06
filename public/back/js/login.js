/**
 * Created by Administrator on 2018-04-06.
 */
$(function(){
  $("#form").bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //对字段进行校验  包含多个所有用对象进行传数组
        fields:{
            username:{
              //校验的规则 校验的规则也是有多中 用对象传数据
                validators:{
                  //非空校验  验证的方法
                    notEmpty:{
                        message:"用户名不能为空"
                    },
                  stringLength:{
                    max:6,
                    min:2,
                    message:"用户名长度必须是2-6位"
                  },
                  callback:{
                    message:"用户名不存在"
                  }
                }
            },
            password:{
              validators:{
                notEmpty:{
                  message:"密码不能为空"
                },
                stringLength:{
                  max:6,
                  min:2,
                  message:"用户名长度必须是2-6位"
                },
                callback:{
                  message:"密码错误"
                }
              }
            }
        }
    })
  $("#form").on("success.form.bv",function(e){
    e.preventDefault();
    $.ajax({
      type:'post',
      data:$("#form").serialize(),
      dataType:'json',
      url:'/employee/employeeLogin',
      success:function(info){
        console.log(info);
        if(info.success){
          location.href="index.html"
        }
        if(info.error===1000){
          $("#form").data("bootstrapValidator").updateStatus("username","INVALID","callback");
        }
        if(info.error===1001){
          $("#form").data("bootstrapValidator").updateStatus("password","INVALID","callback");
        }
      }
    })
  })

  $("[type='reset']").click(function(){
    $("#form").data("bootstrapValidator").resetForm()
  })
})