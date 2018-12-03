# GoldStone.js Introduction

文档主要讲解 gsmin.js 的 API 说明, 以及示例.


## UI Element

首先介绍通过 gsmin.js 调用 APP UI 组件的部分.

### ToastMessage

```javascript
toastMessage(message)
```
```javascript
typeof message === 'string'
```

### showAlert

```javascript
showAlert(callback, title, message)
```
```javascript
typeof callback === 'function' // 用户点击确认按钮的时候执行这个 callback
typeof title === 'string'
typeof message === 'string'
```
_example_
```javascript
document.getElementById('button').addEventListener('click', function() {
    showAlert(
     function() {
      // do something when user click confirm button
     }, // callback
     "Hello World", // title
     "This is a message for description" // message
    )
  })
```

## Tools

APP 提供的工具, 其中包括特有的和公共的.

### encrypt
```javascript
encrypt(callback, data)
```
```javascript
typeof callback === 'function' // 用户点击确认按钮的时候执行这个 callback
typeof data === 'string' // 需要加密的 String 类型的数据 
```
_example_
```javascript
 document.getElementById('button').addEventListener('click', function() {
    var data = "Hello World"
    encrypt(
     function(result) {
      // result 是加密好后的内容, 通过 callback 返回供使用
     }, 
     data
    )
  })
```

### decrypt
```javascript
decrypt(callback, data)
```
```javascript
typeof callback === 'function' // 用户点击确认按钮的时候执行这个 callback
typeof encryptData === 'string' // 需要解密的 String 类型的数据 
```
_example_
```javascript
 document.getElementById('button').addEventListener('click', function() {
    var encryptData = "VZMMO6dRLNFvtwQ="
    decrypt(
     function(result) {
	    // result - Hello World
      // result 是解密好后的内容, 通过 callback 返回供使用
     }, 
     encryptData
    )
  })
```

### getSignHeader
```javascript
getSignHeader(callback)
```
```javascript
typeof callback === 'function' // 用户点击确认按钮的时候执行这个 callback
```
_example_
```javascript
 document.getElementById('button').addEventListener('click', function() {
    var encryptData = "VZMMO6dRLNFvtwQ="
    getSignHeader(
      function(result) {
        // 请求头用到的加密签名
        // 如果向 GoldStone 发起网络请求需要在请求头加入这个签名进行标记合法
      }
    )
  })
```

### getAccountAddress
```javascript
getAccountAddress(callback, contract, symbol, isEOSAccountName)
```
```javascript
typeof callback === 'function' // 用户点击确认按钮的时候执行这个 callback
typeof contract === 'string' // 需要请求的 客户端的对应 contract 的地址
typeof symbol === 'string' // 需要请求的对应的 Symbol
typeof isEOSAccountName === 'boolean' // true 返回 EOS AccountName false 返回 EOS Address (PublicKey)
```
_example_
```javascript
  document.getElementById('button').addEventListener('click', function() {
    var contract = "eosio.token"
    var symbol = "EOS"
    getAccountAddress(
     function(result) {
      // 返回 result 是对应的 AccountName
      // result - kaysaith2leo
     }, 
     contract, 
     symbol, 
     true
    )
  })
```

### getChainID
```javascript
getChainID(callback, chainType)
```
```javascript
typeof callback === 'function' // 用户点击确认按钮的时候执行这个 callback
typeof chainType === 'int' // 需要请求的 客户端的对应 chainType
```
_example_
```javascript
  document.getElementById('button').addEventListener('click', function() {
    var chainType = 194
    getChainID(
     function(result) {
      // 返回 result 是对应的当前客户端正在使用的 chainID
      // result - e70xxx............
     }, 
     chainType
    )
  })
```

## Network Tool

常用的网络请求数据, 提供对应的方法

### getBalance
```javascript
getBalance(callback, contract, symbol)
```
```javascript
typeof callback === 'function' // 用户点击确认按钮的时候执行这个 callback
typeof contract === 'string' // 需要请求的 客户端的对应 contract
typeof symbol === 'string' // 需要请求的 客户端的对应 symbol
```
_example_
```javascript
  document.getElementById('button').addEventListener('click', function() {
    var contract = "eosio.token"
    var symbol = "EOS"
    getBalance(
     function(result) {
      // 返回 result 是 Double 类型的 余额
      // result - 1.2893
     }, 
     contract,
     symbol
    )
  })
```

### getEOSSignedData

_这个 API 目前只对提供的合约类型的, JSON Object 提供签名服务, 接收的 JSON 是 GoldStone 约定的_
_JSON String 类型, 里面包括 Action, Authorization 和 Data 部分, 签名后返回给符合 EOS PushTransaction 格式的_
_JSON String._

```javascript
getEOSSignedData(callback, data)
```
```javascript
typeof callback === 'function' // 用户点击确认按钮的时候执行这个 callback
typeof data === 'string' // 需要签名的 JSON String 类型的数据
```
_example_
```javascript
  document.getElementById('button').addEventListener('click', function() {
    var data = 
	    {
		    "actor": "kaysaith5leo",
		    "permission": "active",
		    "code": "wuxianyinli3",
		    "method": "reportgsid",
		    "chainID": "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473",
		    "data": "202d04fb751666383239616162393864393335373832"
		}
    getEOSSignedData(
     function(result) {
      // result 接收后, 前端自行发起 pushTransaction 的请求
        {
		    "signatures": [
		        "SIG_K1_KAKqF9Tmhej8cCxp7d1Y9kDHzW9Wh5kxg46s647EmvmqeXbtsUUJQathTJ3hFMqzkRH8izDttsFP5whYGqbxhTZUCmVmfG"
		    ],
		    "packed_trx": "4901015c565284d053880000000001305c9cce4fe3bae600407298e54babba0140552c2d3b83bd8100000000a8ed32322d2c323032643034666237353136363633383332333936313631363233393338363433393333333533373338333200",
		    "compression": "none",
		    "packed_context_free_data": "00"
		}
     }, 
     data   )
  })
```

