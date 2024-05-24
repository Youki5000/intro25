'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const userNameInput = document.getElementById('user-name');
  const assessmentButton = document.getElementById('assessment');
  const resultDivision = document.getElementById('result-area');
  const tweetDivision = document.getElementById('tweet-area');

  // 診断ボタンがクリックされたときの処理
  assessmentButton.addEventListener('click', () => {
    const userName = userNameInput.value;
    if (userName.length === 0) {
      return; // 名前が入力されていない場合は処理を中断
    }

    // 診断結果を表示する
    resultDivision.innerText = '';
    const headerDivision = document.createElement('div');
    headerDivision.setAttribute('class', 'card-header text-bg-primary');
    headerDivision.innerText = '診断結果';

    const bodyDivision = document.createElement('div');
    bodyDivision.setAttribute('class', 'card-body');

    const paragraph = document.createElement('p');
    paragraph.setAttribute('class', 'card-text');
    const result = assessment(userName);
    paragraph.innerText = result;
    bodyDivision.appendChild(paragraph);

    resultDivision.setAttribute('class', 'card');
    resultDivision.appendChild(headerDivision);
    resultDivision.appendChild(bodyDivision);

    // ツイートエリアをクリアして新しいツイートボタンを作成
    tweetDivision.innerText = '';
    const anchor = document.createElement('a');
    const hrefValue = 'https://x.com/intent/tweet?button_hashtag=' + encodeURIComponent('あなたのいいところ') + '&ref_src=twsrc%5Etfw';
    
    anchor.setAttribute('href', hrefValue);
    anchor.setAttribute('class', 'twitter-hashtag-button');
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';

    tweetDivision.appendChild(anchor);

    // Twitterのウィジェットスクリプトを読み込む
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivision.appendChild(script);
  });

  // Enterキーが押されたときに診断ボタンをクリックする
  userNameInput.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
      assessmentButton.dispatchEvent(new Event('click'));
    }
  });
});

const answers = [
  '###userName###の運勢は大吉です。いい知らせがくるかも。',
  '###userName###の運勢は大吉です。運命的な出会いがあるかも。',
  '###userName###の運勢は大吉です。今日は何をやっても絶好調。',
  '###userName###の運勢は中吉です。何かいいことあるかも。',
  '###userName###の運勢は中吉です。ちょっとお出かけしてみよう。',
  '###userName###の運勢は中吉です。おいしいものを食べに出かけてみよう。',
  '###userName###の運勢は小吉です。ちょっぴりいいことあるかも。',
  '###userName###の運勢は末吉です。次はいいことあると思う。',
  '###userName###の運勢は末吉です。何事も控えめに。',
  '###userName###の運勢は凶です。今日は安静にしましょう。'
];

// 名前に基づいて診断結果を生成する関数
function assessment(userName) {
  const now = new Date();
  const day = now.getDate(); // 現在の日付を取得

  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode += userName.charCodeAt(i);
  }

  // 日を加えて結果を日替わりにする
  sumOfCharCode += day;

  // 文字のコード番号の合計を回答の数で割って添字の数値を求める
  const index = sumOfCharCode % answers.length;
  let result = answers[index];
  result = result.replaceAll('###userName###', userName);
  return result;
}
