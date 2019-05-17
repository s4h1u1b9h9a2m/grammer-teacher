<template>
    <el-menu class="shub-menu-vertical" :collapse="true" :router="true">
        <template v-for="(item, index) in items">
            <template v-if="item.isParent">
                <el-submenu :key="index" :index="index.toString()">
                    <template slot="title">
                        <i :class="item.icon"></i>
                        <span slot="title">{{item.name}}</span>
                    </template>
                    <el-menu-item 
                        v-for="(path, subIndex) in item.paths" 
                        :index="path.path" 
                        :key="subIndex"
                    >
                    {{path.name}}
                    </el-menu-item>
                </el-submenu>
            </template>
            <template v-else>
                <el-menu-item 
                    :index="item.path" 
                    :key="index"
                >
                    <i :class="item.icon"></i>
                    <span slot="title">{{item.name}}</span>
                </el-menu-item>
            </template>
        </template>
    </el-menu>
</template>
<script>
/* eslint-disable */
export default {
    name: "NavigationMenu",
    data () {
        return {
            items: [{
                name: 'Home',
                icon: 'el-icon-s-home',
                path: '/'
            }, {
                name: 'Speech To Text',
                icon: 'el-icon-microphone',
                isParent: true,
                paths: [{
                    name: 'WebSpeechAPI',
                    path: '/WebSpeechAPI',
                }, {
                    name: 'MediaStreamAPI',
                    path: '/MediaStreamAPI',
                }]
            }]
        }
    }
}
</script>
<style scoped>
.shub-menu-vertical {
    height: 100%;
}
</style>
