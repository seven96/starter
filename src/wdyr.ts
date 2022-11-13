/**
 * @Author : lishiwen
 * @Date : 2022/11/13 14:29
 * @Description : wdyr 用于检测组件重复渲染
 * @see https://github.com/welldone-software/why-did-you-render 
*/

/// <reference types="@welldone-software/why-did-you-render" />
import React from 'react';

if (process.env.isDev) {
    const whyDidYouRender = require('@welldone-software/why-did-you-render');

    whyDidYouRender(React, {
        // trackAllPureComponents: true,
        trackExtraHooks: [[require('react-redux/dist/react-redux.js'), 'useSelector']],
    });
}