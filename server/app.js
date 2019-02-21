var createError = require('http-errors');
var express = require('express');
var path = require('path');

var cookieParser = require('cookie-parser');
var session=require('express-session');
/** morgan中间件记录日志 */
var logger = require('morgan');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/product');

var app = express();
//session
app.use(session({
  secret:'goods12345',               //设置 session 签名
  name:'goods',
  cookie:{maxAge:60*1000*60*24}, // 储存的时间 24小时
  resave:false,             // 每次请求都重新设置session
  saveUninitialized:true
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
/**
 * 可以将请求信息打印在控制台，便于开发调试
 * 输出格式 :method :url :status :response-time ms - :res[content-length]（返回字符串的长度）
 */
app.use(logger('dev'));  
app.use((req,res,next)=>{
  　res.header("Access-Control-Allow-Credentials", "true");
　　res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
　　// res.header('Access-Control-Allow-Origin', '*');
　　res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
　　res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
　　if (req.method == 'OPTIONS') {
　　　　res.send(200); /*让options请求快速返回*/
　　} else {
　　　　next();
　　}
})
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/** 加载静态文件资源 */
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/upload',express.static(path.join(__dirname,'upload')));

app.use('/', indexRouter);
app.use('/api',loginRouter);
app.use('/api/users', usersRouter);
app.use('/api/product', productRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
