# 🕊️ "Я Есть" — Deployment Guide

**Статус:** Готов к деплою
**Дата:** 2026-03-20
**Автор:** Савелий (Архитектор)

---

## 📋 Pre-deployment Checklist

- [ ] **Домен куплен** (Александр)
- [ ] **Сервер с Nginx** доступен (есть личный сервер?)
- [ ] **SSH доступ** к серверу
- [ ] **DNS настроен** (A record → IP сервера)

---

## 🔧 Шаг 1: Подготовка сервера

```bash
# Обновить систему
sudo apt update && sudo apt upgrade -y

# Установить Nginx
sudo apt install nginx -y

# Создать директорию для сайта
sudo mkdir -p /var/www/iam-site
sudo chown -R $USER:$USER /var/www/iam-site
```

---

## 🔧 Шаг 2: Загрузить файлы сайта

```bash
# Скопировать файлы на сервер (с локальной машины)
scp -r ./index.html ./style.css ./script.js user@your-server:/var/www/iam-site/

# Или клонировать из репозитория
git clone https://github.com/your-repo/iam-site.git /var/www/iam-site/
```

---

## 🔧 Шаг 3: Настроить Nginx

```bash
# Скопировать конфиг (с заменой домена)
sudo cp nginx.conf /etc/nginx/sites-available/iam-site

# Отредактировать конфиг — заменить i-am.site на реальный домен
sudo nano /etc/nginx/sites-available/iam-site

# Активировать сайт
sudo ln -s /etc/nginx/sites-available/iam-site /etc/nginx/sites-enabled/

# Тест конфигурации
sudo nginx -t

# Перезагрузить Nginx
sudo systemctl reload nginx
```

---

## 🔧 Шаг 4: SSL Certificate (Let's Encrypt)

```bash
# Установить Certbot
sudo apt install certbot python3-certbot-nginx -y

# Создать директорию для ACME challenge
sudo mkdir -p /var/www/certbot

# Получить сертификат (заменить example.com на домен)
sudo certbot --nginx -d example.com -d www.example.com

# Автопродление (обычно работает автоматически)
sudo certbot renew --dry-run
```

---

## 🔧 Шаг 5: DNS

| Запись | Тип | Значение |
|--------|-----|----------|
| @ | A | `<IP сервера>` |
| www | A | `<IP сервера>` |

```bash
# Проверить DNS распространение
dig example.com +short
nslookup www.example.com
```

---

## 🔧 Шаг 6: Проверка

```bash
# Открыть в браузере
https://example.com

# Или curl
curl -I https://example.com

# Проверить SSL
sslabs
```

---

## 🔧 Шаг 7: Обновления

Для обновления файлов сайта:
```bash
# Отредактировать файлы
nano /var/www/iam-site/index.html

# Перезагрузить Nginx
sudo systemctl reload nginx
```

---

## 📁 Структура файлов на сервере

```
/var/www/iam-site/
├── index.html
├── style.css
└── script.js

/etc/nginx/sites-available/iam-site   # Конфиг
/etc/letsencrypt/live/example.com/    # SSL сертификат
```

---

## ⚠️ Troubleshooting

| Проблема | Решение |
|----------|---------|
| 502 Bad Gateway | Проверить что Nginx запущен: `sudo systemctl status nginx` |
| SSL ошибка | Проверить что сертификат получен: `sudo certbot certificates` |
| Не открывается | Проверить firewall: `sudo ufw status` |

---

## 🚀 Быстрый старт (кратко)

```bash
# 1. Купить домен (Namecheap/Cloudflare)
# 2. Сервер: Ubuntu + Nginx
# 3. Загрузить файлы в /var/www/iam-site/
# 4. Настроить nginx.conf (заменить i-am.site)
# 5. certbot --nginx -d domain.com
# 6. Готово!
```

---

## ⏭️ Следующий шаг

**Александру:** Выбрать домен из списка свободных:
1. `iam-core.io` — 🥇 топ-выбор
2. `yaest.site` — 🥈 для RU-аудитории
3. `iam-now.io` — краткий + динамичный

После выбора домена — сообщить команде, и Денис/Илюша запустят деплой.
