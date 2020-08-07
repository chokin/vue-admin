<template>
    <div id='login' class=''>
        <div class="login_warp">
            <ul id="menu-tab">
                <li :class="{'current':item.current}" v-for="item in menuTab" :key="item.id" @click="togglemenu(item)">{{item.text}}</li>
            </ul>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="loginform">
                <el-form-item prop="username">
                    <label>邮箱</label>
                    <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="pass">
                    <label>密码</label>
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off" maxlength="20" minlength="6"></el-input>
                </el-form-item>
                <el-form-item prop="pass2" v-if="model==='register'">
                    <label>再次密码</label>
                    <el-input type="password" v-model="ruleForm.pass2" autocomplete="off" maxlength="20" minlength="6"></el-input>
                </el-form-item>
                <el-form-item prop="verify">
                    <label>验证码</label>
                    <el-row :gutter=20>
                        <el-col :span="14"><el-input type="text" v-model="ruleForm.verify" autocomplete="off" maxlength="6" minlength="6"></el-input></el-col>
                        <el-col :span="10"><el-button type="success" class="block" @click="submitForm('ruleForm')">获取验证码</el-button></el-col>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" class="login-bton block" @click="submitForm('ruleForm')">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
        

    </div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';
    import { stripscript,chackMali } from "@/utils/validate"
    export default {
      //import引入的组件需要注入到对象中才能使用
      components: {},
      data() {       
      
        var validatePass1 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入邮箱'));
            }else if(!chackMali(value)){
                callback(new Error('请输入正确格式的邮箱'));
            } else {            
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            this.ruleForm.pass=stripscript(value)
            value=this.ruleForm.pass
            console.log(value);
            let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
            if (value === '') {
                callback(new Error('请输入密码'));
            }else if(!reg.test(value)){
                callback(new Error('请输入6-20位的字母和数字'));
            } else {            
                callback();
            }
        };
        var validatePass2_2 = (rule, value, callback) => {
            this.ruleForm.pass2=stripscript(value)
            value=this.ruleForm.pass2

            if (value === '') {
                callback(new Error('请输入密码'));
            }else if(value!=this.ruleForm.pass){
                callback(new Error('两次输入密码不一致，请重新输入'));
            } else {            
                callback();
            }
        };
        var validatePass3 = (rule, value, callback) => {
            this.ruleForm.verify=stripscript(value)
            value=this.ruleForm.verify
            let reg = /^[0-9A-Za-z]{6}$/
            if (value === '') {
                callback(new Error('请输入验证码'));
            }else if(!reg.test(value)){
                callback(new Error('请输入6位的验证码'));
            } else {
                callback();
            }
        };
        //这里存放数据
        return {
            menuTab:[
                {text:"登录",current:true,model:"login"},
                {text:"注册",current:false,model:"register"}
            ],
            model:"login",
            ruleForm: {
                pass: '',
                pass2: '',
                username: '',
                verify: ''
            },
            rules: {
                username: [
                    { validator: validatePass1, trigger: 'blur' }
                ],
                pass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                pass2: [
                    { validator: validatePass2_2, trigger: 'blur' }
                ],
                verify: [
                    { validator: validatePass3, trigger: 'blur' }
                ],
            
            }
          
        };
      },
      //监听属性 类似于data概念
      computed: {},
      //获取父组件的参数
      props: {},
      //监控data中的数据变化
      watch: {},
      //方法集合
      methods: {
        togglemenu(data){
            this.menuTab.forEach(elem=>{
                elem.current=false
            })
            data.current=true
            this.model=data.model
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                alert('submit!');
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }



      },
      //生命周期 - 创建完成（可以访问当前this实例）
      created() {
        
      },
      //生命周期 - 挂载完成（可以访问DOM元素）
      mounted() {
        
      },
      beforeCreate() {}, //生命周期 - 创建之前
      beforeMount() {}, //生命周期 - 挂载之前
      beforeUpdate() {}, //生命周期 - 更新之前
      updated() {}, //生命周期 - 更新之后
      beforeDestroy() {}, //生命周期 - 销毁之前
      destroyed() {}, //生命周期 - 销毁完成
      activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
      //@import url(); 引入公共css类
    #login{ background:url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596693552852&di=2277c10ad7f8f90973eb65f88f5134a9&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F8%2F53cdcf4703820.jpg") no-repeat center; height: 100vh; padding-top: 20vh; width: 100%;}
    .login_warp{ 
        width: 330px; 
        margin:0 auto; 
        background: rgba(8,98,150,0.7); 
        border-radius: 7px; 
        padding-bottom: 20px;
        
        #menu-tab{
            text-align: center;
            margin: 0;
            padding: 0;
            
            li{
                list-style: none;
                width: 30%;
                margin:10px 10%;
                text-align: center;
                display: inline-block;
                height: 30px;
                cursor: pointer;
                border-radius: 3px;
                line-height: 30px; color: #fff;
                
            }
            .current{
                    background:rgba($color: #000000, $alpha:0.6);

                }
        }
        .loginform{
            width: 90%;
            margin: 0 auto;
            label{ color: #fff;}
            .block{display: block; width: 100%;}
            .login-bton{margin-top: 19px;}
        }
    
    }
    
      
</style>