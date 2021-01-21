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

> 點擊上方的File按鈕，點new，輸入檔名。

<a name="rename"/>

#### 更改檔案名稱

> 點擊左方的Folder按鈕，對著檔案按右鍵，選擇Rename。

<a name="delete"/>

#### 刪除檔案

> 點擊左方的Folder按鈕，對著檔案按右鍵，選擇Delete。

<a name="save"/>

#### 儲存檔案

> 點擊上方的File按鈕，點save，或者點擊文件右上角的儲存按鈕。

<a name="search"/>

#### 搜尋檔案

> 點擊左方的放大鏡按鈕，輸入檔名，如果要搜尋有特定tag的檔案，輸入tags: <tag名稱>。

<a name="tags"/>

#### 檔案標籤

> 可在下方的tag bar加入此File的tag，右方拉開後點擊tag按鈕可以看到所有文件的標籤和其數量，點擊可自動查詢包含那個tag的Files。

<a name="Link"/>

#### 檔案之間連結

> 在文件中加入雙中括號([[]])，可建立起自己檔案之間的連結，右方拉開後點擊link按鈕可以看到link到自己的檔案和自己link到別人的檔案，link只會在save之後建立。

<a name="view"/>

#### 開啟/關閉markdown預覽模式

> 點擊文件右上角的眼睛按鈕。

<a name="avatar"/>

#### 更改大頭貼

> 點擊右上方的圖示，再點擊change avatar，可上傳並裁切大頭照。

<a name="logout"/>

#### 登出

> 點擊右上方的圖示，再點擊log out便可以登出。

<a name="account"/>

#### 刪除帳號

> 點擊右上方的圖示，點擊delete account，再點擊Yes。
## Deployed 連結
https://abyss-notes.herokuapp.com/
## Demo 影片連結
## Packages
Frontend:
1. React, Materials-UI  
2. Apollo
1. react-markdown
1. formik and Yup
1. react-image-crop
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
  * 登入/註冊介面
  * jwt驗證
  * 後端功能
  * 前後端溝通
  * 裁切照片/markdown預覽/tags,links搜尋  
  * Deployment  
  
黃維坪:
## 心得
