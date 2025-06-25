#!/usr/bin/env node

const { execSync } = require('node:child_process')
const fs = require('node:fs')
const path = require('node:path')
const process = require('node:process')

console.log('Starting Vercel build...')

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

    console.log('Build completed successfully!')

    // 验证构建输出
    const files = [
        'dist/client/index.html',
        'dist/client/.vite/ssr-manifest.json',
        'dist/server/entry-server.js',
        'dist/server.js',
    ]

    files.forEach((file) => {
        if (fs.existsSync(file)) {
            console.log(`✅ ${file} exists`)
        }
        else {
            console.log(`❌ ${file} missing`)
        }
    })
}
catch (error) {
    console.error('Build failed:', error)
    process.exit(1)
}
