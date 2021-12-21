
# Annotorious
- https://github.com/recogito/annotorious
- https://recogito.github.io/annotorious/
- npm i @recogito/annotorious
- Better Polygon : 
npm i @recogito/annotorious-better-polygon
, BetterPolygon(anno) : https://github.com/recogito/recogito-client-plugins/tree/main/plugins

# Annotorious
## 수정사항
- 도형 완성시에 라벨들이 바로 나타나서 하나 선택할 수 있도록 코드 수정
- 선택하는 라벨에 따라 선의 색을 각각 다르게 수정

# ** Annotorious core를 수정할때 
1. git clone 하고 yarn install (기본)
2. node_modules\@recogito\annotorious(수정) > npm or yarn install
3. node_modules\@recogito\annotorious > node_modules > @recogito > recogito-client-core > 수정
4. 수정할때 마다 node_modules\@recogito\annotorious > npm install
5. 수정할때 그 전 수정 사항들도 다 덮어씌어 줘야함

