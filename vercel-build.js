#!/usr/bin/env node

import { execSync } from 'node:child_process'
import fs from 'node:fs'
import process from 'node:process'

console.log('Starting Vercel build...')

// 设置 Vercel 环境变量
process.env.NODE_ENV = 'production'
process.env.VITE_APP_ENV = 'production'
process.env.VERCEL = 'true'

console.log('Environment variables set:', {
    NODE_ENV: process.env.NODE_ENV,
    VITE_APP_ENV: process.env.VITE_APP_ENV,
    VERCEL: process.env.VERCEL,
})

try {
    // 确保 dist 目录存在
    if (!fs.existsSync('dist')) {
        fs.mkdirSync('dist', { recursive: true })
    }

    // 执行构建命令
    console.log('Building client...')
    execSync('npm run build:client', { stdio: 'inherit' })

    console.log('Building server...')
    execSync('npm run build:server', { stdio: 'inherit' })

    console.log('Building server entry...')
    execSync('npm run build:server:entry', { stdio: 'inherit' })

    // 复制 API 目录到 dist
    console.log('Copying API directory...')
    if (fs.existsSync('api')) {
        execSync('cp -r api dist/', { stdio: 'inherit' })
        console.log('✅ API directory copied')
    }
    else {
        console.log('❌ API directory not found')
    }

    console.log('Build completed successfully!')

    // 验证构建输出
    const files = [
        'dist/client/index.html',
        'dist/client/.vite/ssr-manifest.json',
        'dist/server/entry-server.js',
        'dist/server.js',
        'dist/api/index.js',
        'dist/api/web/[...path].js',
    ]

    files.forEach((file) => {
        if (fs.existsSync(file)) {
            console.log(`✅ ${file} exists`)
        }
        else {
            console.log(`❌ ${file} missing`)
        }
    })

    // 列出 dist 目录内容
    console.log('Dist directory contents:')
    const listDir = (dir, prefix = '') => {
        const items = fs.readdirSync(dir)
        items.forEach((item) => {
            const path = `${dir}/${item}`
            const stat = fs.statSync(path)
            if (stat.isDirectory()) {
                console.log(`${prefix}📁 ${item}/`)
                listDir(path, `${prefix}  `)
            }
            else {
                console.log(`${prefix}📄 ${item}`)
            }
        })
    }
    listDir('dist')
}
catch (error) {
    console.error('Build failed:', error)
    process.exit(1)
}
