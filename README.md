# Abyss-Notes

## 功能簡介

1. [New File](#new)
2. [Rename File](#rename)
3. [Delete File](#delete)
4. [Save File](#save)
5. [Search Files](#search)
6. [Search Tags](#tags)
7. [File internal Link](#Link)
8. [View](#view)
9. [Change Avatar](#avatar)
10. [Log Out](#logout)
11. [Delete Account](#account)

## 使用方法

<a name="new"/>

#### 新增檔案

> 點擊上方的 File 按鈕，點 new，輸入檔名。

<a name="rename"/>

#### 更改檔案名稱

> 點擊左方的 Folder 按鈕，對著檔案按右鍵，選擇 Rename。

<a name="delete"/>

#### 刪除檔案

> 點擊左方的 Folder 按鈕，對著檔案按右鍵，選擇 Delete。

<a name="save"/>

#### 儲存檔案

> 點擊上方的 File 按鈕，點 save，或者點擊文件右上角的儲存按鈕。

<a name="search"/>

#### 搜尋檔案

> 點擊左方的放大鏡按鈕，輸入檔名，如果要搜尋有特定 tag 的檔案，輸入 tags: <tag 名稱>。

<a name="tags"/>

#### 檔案標籤

> 可在下方的 tag bar 加入此 File 的 tag，右方拉開後點擊 tag 按鈕可以看到所有文件的標籤和其數量，點擊可自動查詢包含那個 tag 的 Files。

<a name="Link"/>

#### 檔案之間連結

> 在文件中加入雙中括號([[]])，可建立起自己檔案之間的連結，右方拉開後點擊 link 按鈕可以看到 link 到自己的檔案和自己 link 到別人的檔案，link 只會在 save 之後建立。

<a name="view"/>

#### 開啟/關閉 markdown 預覽模式

> 點擊文件右上角的眼睛按鈕。

<a name="avatar"/>

#### 更改大頭貼

> 點擊右上方的圖示，再點擊 change avatar，可上傳並裁切大頭照。

<a name="logout"/>

#### 登出

> 點擊右上方的圖示，再點擊 log out 便可以登出。

<a name="account"/>

#### 刪除帳號

> 點擊右上方的圖示，點擊 delete account，再點擊 Yes。

## Deployed 連結

https://abyss-notes.herokuapp.com/

## Demo 影片連結

https://youtu.be/s83x_i8uxqM

## Packages

Frontend:

1. React, Materials-UI
2. Apollo
3. react-markdown
4. formik and Yup
5. react-image-crop

Backend:

1. @hapi/joi:check registration data
1. cors
1. bcryptjs: encrypt blank password
1. jsonwebtoken
1. Graphql-yoga

## Reference

https://github.com/benawad/jwt-auth-example.git  
https://github.com/hidjou/classsed-merng-client.git

## Framework

前端:React  
後端:MongoDb, Express.js, Node.js, Graphql

## 組員貢獻

周毓修:

-   登入/註冊介面
-   jwt 驗證
-   後端功能
-   前後端溝通
-   裁切照片/markdown 預覽/tags,links 搜尋
-   Deployment

黃維坪:

-   頁面設計/調整
-   主介面
-   前端功能
-   前後端溝通
-   Presentation

## 心得

黃維坪:

> 第一次做一個完整的網站，我們挑選了一個比較基礎的主題--線上筆記軟體。我負責的部分是前端
>，製作完設計圖後，使用各種 Material-UI 的部件組成。在實作過程中，需要讓各部件溝通以正確
> 完成的 CRUD 操作並與後端連接，比想像中困難許多，也是花上最多時間的部分。微調介面使我對操作 css
> 更為熟悉，並學會如何結合各種不同的 hook 來完成部件間的溝通，最後做後端串接時則需要兩人一
> 起討論與測試，抓出各種 bug。在這學期的課程中獲得完整開發一個網頁服務的寶貴經驗，能學以致用非常有成就感。

周毓修: 
> 期末前原本先架了一個純express的server，但後來學到graphql便決定改用graphql-yoga來建server，從考完期末開始建，到現在deploy到heroku總共差不多一個禮拜，能做出這個作品實在是很高興。> 期間最困難的是jwt token的驗證和set cookie的流程，完成後真的是爽到不行。這次的project讓我大致了解了web開發的所有流程，這個經驗實在非常值得，這門課只能說一句: 大推!

