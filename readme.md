tinyImages
========

压缩图片并上传阿里云oss

## 须知

目前知支持jpg和png图片的压缩

## 使用

将需要处理的图片放入`asserts`文件夹，之后在终端输入

```bash
yarn tiny
```


如果需要上传，请参看 src/main.js 中的代码，并配置 config.yaml。

## 参考

[squoosh-lib](https://www.npmjs.com/package/@squoosh/lib)
[ali-oss](https://www.npmjs.com/package/ali-oss)
