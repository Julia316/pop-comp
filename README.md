# pop-comp
> A pop component  in JavaScript 


### 可选参数

    * boxPos:'fixed',    ## 弹窗随页面固定(fixed)还是随页面滚动(absolute)
    * bgUrl:'',          ## 弹窗背景图片地址
    * closeUrl:'',       ## 关闭按钮图片地址
    * w:0,               ## 弹窗内容宽度
    * h:0,               ## 弹窗内容高度
    * dir:'center',      ## 可选center left  right
    * dirW:0,            ## center时可不填；right时是距离右边的距离；left时是距离左边的距离
    * dirH:0,            ## center时可不填；right时是距离底部的距离；left时是距离顶部的距离
    * mark:false,        ## 是否有遮罩层
    * close:true,        ## 是否有关闭按钮
    * closeTop:0,        ## 关闭按钮paddingTop值 
    * closeLeft:0,       ## 关闭按钮paddingLeft值
    * closeRotate:true,  ## 关闭按钮hover时是否有旋转变化
    * drag:false,        ## 是否可以拖拽
    * dragLim:true,      ## 拖拽式是否限制范围 
    * dragMag:'',        ## 拖拽时是否有磁性吸附，空为无磁性吸附，数字为吸附范围
    * shake:false,       ## 是否有定时抖动
    * resize:false,      ## 是否可以拖拽边缘改变弹窗尺寸
    * showAnm:true,      ## 是否有出现动画
    * hideAnm:true,      ## 是否有退出动画
    * showPos:'',        ## 弹窗出现的位置,默认为空，填数字
    * hidePos:'',        ## 弹窗消失的位置(hidePos>showPos)
    * content:""         ## /弹窗里的内容（除背景和关闭按钮外）
