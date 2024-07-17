/**
 * loading 占位
 * 解决首次加载时白屏的问题
 */
(function () {
  const div = document.createElement('div')
  const body = document.querySelector('body')
  body.appendChild(div)
  div.setAttribute('id', 'loading-app')
  if (div && div.innerHTML === '') {
    div.innerHTML = `
    <style>
    body {
        margin: 0;
    }
    .loader-wrap {
        height: 100vh;
        width: 100vw;
        background-color: #f5f5f5;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .loader-wrap {
        background-color: #595BD4;
    }

    .loading {
        position: absolute;
        left: 0;
        right: 0;
        top: 50%;
        width: 130px;
        color: #FFF;
        margin: auto;
        -webkit-transform: translateY(-50%);
        -moz-transform: translateY(-50%);
        -o-transform: translateY(-50%);
        transform: translateY(-50%);
    }

    .loading span {
        position: absolute;
        height: 10px;
        width: 84px;
        top: 50px;
        overflow: hidden;
    }

    .loading span>i {
        position: absolute;
        height: 6px;
        width: 6px;
        border-radius: 50%;
        -webkit-animation: wait 4s infinite;
        -moz-animation: wait 4s infinite;
        -o-animation: wait 4s infinite;
        animation: wait 4s infinite;
    }

    .loading span>i:nth-of-type(1) {
        left: -28px;
        background: yellow;
    }

    .loading span>i:nth-of-type(2) {
        left: -21px;
        -webkit-animation-delay: 0.8s;
        animation-delay: 0.8s;
        background: lightgreen;
    }

    @-webkit-keyframes wait {
        0% {
            left: -7px
        }

        30% {
            left: 52px
        }

        60% {
            left: 22px
        }

        100% {
            left: 100px
        }
    }

    @-moz-keyframes wait {
        0% {
            left: -7px
        }

        30% {
            left: 52px
        }

        60% {
            left: 22px
        }

        100% {
            left: 100px
        }
    }

    @-o-keyframes wait {
        0% {
            left: -7px
        }

        30% {
            left: 52px
        }

        60% {
            left: 22px
        }

        100% {
            left: 100px
        }
    }

    @keyframes wait {
        0% {
            left: -7px
        }

        30% {
            left: 52px
        }

        60% {
            left: 22px
        }

        100% {
            left: 100px
        }
    }
</style>

<div class="loader-wrap">
<div class="loading">
    <p>正在加载资源 ...</p>
    <span><i></i><i></i></span>
</div>
</div>
    `
  }
})()
