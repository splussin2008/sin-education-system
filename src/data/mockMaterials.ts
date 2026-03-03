import { Material } from '@/types/material';

export const mockMaterials: Material[] = [
    // --- 中1 数学 ---
    {
        id: 'math-j1-1',
        title: '正負の数 計算ドリル（加減乗除）',
        grade: '中1',
        subject: '数学',
        unit: '正の数・負の数',
        level: '基礎',
        pdfUrl: '#',
        questions: [
            {
                id: '1', title: '次の加法・減法を計算しなさい。', points: 5, items: [
                    { id: '1-1', text: '5 + (-8)', answerArea: 'calc', answer: '-3' },
                    { id: '1-2', text: '-12 - (-7)', answerArea: 'calc', answer: '-5' },
                    { id: '1-3', text: '-9 + 14', answerArea: 'calc', answer: '5' },
                    { id: '1-4', text: '0 - (-6)', answerArea: 'calc', answer: '6' },
                    { id: '1-5', text: '-15 + (-4)', answerArea: 'calc', answer: '-19' },
                    { id: '1-6', text: '23 - 35', answerArea: 'calc', answer: '-12' },
                ]
            },
            {
                id: '2', title: '次の乗法・除法を計算しなさい。', points: 5, items: [
                    { id: '2-1', text: '(-6) \\times 7', answerArea: 'calc', answer: '-42' },
                    { id: '2-2', text: '35 \\div (-5)', answerArea: 'calc', answer: '-7' },
                    { id: '2-3', text: '(-8) \\times (-9)', answerArea: 'calc', answer: '72' },
                    { id: '2-4', text: '(-48) \\div (-6)', answerArea: 'calc', answer: '8' },
                    { id: '2-5', text: '(-1) \\times 100', answerArea: 'calc', answer: '-100' },
                    { id: '2-6', text: '0 \\div (-12)', answerArea: 'calc', answer: '0' },
                ]
            },
            {
                id: '3', title: '次の計算をしなさい。（累乗と四則混合）', points: 10, items: [
                    { id: '3-1', text: '(-3)^2 - 4 \\times (-2)', answerArea: 'calc', answer: '17' },
                    { id: '3-2', text: '-2^4 + 18 \\div (-3)', answerArea: 'calc', answer: '-22' },
                    { id: '3-3', text: '5 \\times (-2)^3 - (-12)', answerArea: 'calc', answer: '-28' },
                    { id: '3-4', text: '(-4)^2 \\div 2 - (-5) \\times 3', answerArea: 'calc', answer: '23' },
                ]
            }
        ]
    },
    {
        id: 'math-j1-2',
        title: '文字式の計算と代入',
        grade: '中1',
        subject: '数学',
        unit: '文字の式',
        level: '標準',
        pdfUrl: '#',
        questions: [
            {
                id: '1', title: '次の式を簡単にしなさい。', points: 5, items: [
                    { id: '1-1', text: '3x + 5x - 2x', answerArea: 'calc', answer: '6x' },
                    { id: '1-2', text: '7a - 4 - 2a + 9', answerArea: 'calc', answer: '5a + 5' },
                    { id: '1-3', text: '-2x + 8x - 5x', answerArea: 'calc', answer: 'x' },
                    { id: '1-4', text: '4y - 6 + 3y - 2', answerArea: 'calc', answer: '7y - 8' },
                ]
            },
            {
                id: '2', title: '次の計算をしなさい。', points: 10, items: [
                    { id: '2-1', text: '4(2a - 3) - 3(a - 5)', answerArea: 'calc', answer: '5a + 3' },
                    { id: '2-2', text: '-2(3x - 1) + 5(x + 2)', answerArea: 'calc', answer: '-x + 12' },
                    { id: '2-3', text: '\\frac{2x - 1}{3} + \\frac{x + 4}{2}', answerArea: 'calc', answer: '\\frac{7x + 10}{6}' },
                    { id: '2-4', text: '\\frac{3a - 2}{4} - \\frac{a - 5}{6}', answerArea: 'calc', answer: '\\frac{7a + 4}{12}' },
                ]
            },
            {
                id: '3', title: 'x = -3, y = 4 のとき、次の式の値を求めなさい。', points: 10, items: [
                    { id: '3-1', text: '2x - 3y', answerArea: 'calc', answer: '-18' },
                    { id: '3-2', text: 'x^2 + 2y', answerArea: 'calc', answer: '17' },
                    { id: '3-3', text: '-x^2 - y^2', answerArea: 'calc', answer: '-25' },
                    { id: '3-4', text: '\\frac{y - x}{7}', answerArea: 'calc', answer: '1' },
                ]
            }
        ]
    },
    {
        id: 'math-j1-3',
        title: '方程式の文章題（速さ・道のり・時間）',
        grade: '中1',
        subject: '数学',
        unit: '一次方程式',
        level: '発展',
        pdfUrl: '#',
        questions: [
            {
                id: '1', title: '次の方程式を解きなさい。', points: 10, items: [
                    { id: '1-1', text: '3x - 7 = x + 5', answerArea: 'calc', answer: 'x = 6' },
                    { id: '1-2', text: '2(x - 3) = 5x + 9', answerArea: 'calc', answer: 'x = -5' },
                    { id: '1-3', text: '0.3x - 1.2 = 0.5x + 0.4', answerArea: 'calc', answer: 'x = -8' },
                    { id: '1-4', text: '\\frac{x - 2}{3} = \\frac{2x + 1}{4}', answerArea: 'calc', answer: 'x = -11' },
                ]
            },
            {
                id: '2', title: '次の問いに答えなさい。（方程式を立てて解くこと）', points: 15, items: [
                    { id: '2-1', text: 'あるクラスの生徒が長いすに座るのに、1脚に3人ずつ座ると15人が座れなくなり、1脚に4人ずつ座ると最後の長いすには2人だけが座った。長いすの数と生徒の人数を求めなさい。', answerArea: 'long', answer: '長いす:17脚, 生徒:66人' },
                    { id: '2-2', text: 'A町からB町まで行くのに、時速4kmで歩くと、時速12kmの自転車で行くよりも2時間多くかかった。A町からB町までの道のりを求めなさい。', answerArea: 'long', answer: '12km' },
                    { id: '2-3', text: '兄は800円、弟は500円持っている。2人とも同じノートを1冊ずつ買ったところ、兄の残金が弟の残金の2倍になった。このノート1冊の値段を求めなさい。', answerArea: 'long', answer: '200円' },
                ]
            }
        ]
    },

    // --- 中2 数学 ---
    {
        id: 'math-j2-1',
        title: '連立方程式の計算ドリル',
        grade: '中2',
        subject: '数学',
        unit: '連立方程式',
        level: '基礎',
        pdfUrl: '#',
        questions: [
            {
                id: '1', title: '次の連立方程式を解きなさい（加減法）。', points: 10, items: [
                    { id: '1-1', text: 'x + y = 7\\n2x - y = 5', answerArea: 'calc', answer: 'x = 4, y = 3' },
                    { id: '1-2', text: '3x + 2y = 12\\nx - 2y = -4', answerArea: 'calc', answer: 'x = 2, y = 3' },
                    { id: '1-3', text: '5x - 3y = 9\\n2x + 3y = 12', answerArea: 'calc', answer: 'x = 3, y = 2' },
                    { id: '1-4', text: '4x - 5y = -2\\n4x + y = 10', answerArea: 'calc', answer: 'x = 2, y = 2' },
                ]
            },
            {
                id: '2', title: '次の連立方程式を解きなさい（代入法）。', points: 10, items: [
                    { id: '2-1', text: 'y = 2x - 3\\n3x + 2y = 8', answerArea: 'calc', answer: 'x = 2, y = 1' },
                    { id: '2-2', text: 'x = 3y + 1\\n2x - 5y = 4', answerArea: 'calc', answer: 'x = 7, y = 2' },
                    { id: '2-3', text: 'y = -x + 4\\nx - 3y = -8', answerArea: 'calc', answer: 'x = 1, y = 3' },
                ]
            },
            {
                id: '3', title: '次の連立方程式を解きなさい（係数をそろえる）。', points: 15, items: [
                    { id: '3-1', text: '2x + 3y = 8\\n3x - 2y = 25', answerArea: 'calc', answer: 'x = 7, y = -2' },
                    { id: '3-2', text: '4x - 3y = 14\\n3x + 5y = -4', answerArea: 'calc', answer: 'x = 2, y = -2' },
                ]
            }
        ]
    },
    {
        id: 'math-j2-2',
        title: '一次関数の利用（グラフと面積）',
        grade: '中2',
        subject: '数学',
        unit: '一次関数',
        level: '標準',
        pdfUrl: '#',
        questions: [
            {
                id: '1', title: '次の条件を満たす一次関数の式を求めなさい。', points: 10, items: [
                    { id: '1-1', text: 'グラフの傾きが 3 で、点 (2, 5) を通る。', answerArea: 'calc', answer: 'y = 3x - 1' },
                    { id: '1-2', text: 'グラフが点 (-1, 4) と点 (3, -4) を通る。', answerArea: 'calc', answer: 'y = -2x + 2' },
                    { id: '1-3', text: 'x = 3 のとき y = -2 であり、x が 2 増加すると y は 8 増加する。', answerArea: 'calc', answer: 'y = 4x - 14' },
                    { id: '1-4', text: '直線 y = -\\frac{1}{2}x + 3 に平行で、点 (4, -1) を通る。', answerArea: 'calc', answer: 'y = -\\frac{1}{2}x + 1' },
                ]
            },
            {
                id: '2', title: '一次関数のグラフと図形の問題に答えなさい。', points: 20, items: [
                    { id: '2-1', text: '直線 L: y = -x + 6、直線 M: y = 2x - 3 がある。この2直線の交点の座標を求めなさい。', answerArea: 'calc', answer: '(3, 3)' },
                    { id: '2-2', text: '直線 L と x軸、y軸とで囲まれた三角形の面積を求めなさい。（座標の1目盛りを1cmとする）', answerArea: 'calc', answer: '18 cm^2' },
                    { id: '2-3', text: '直線 L、直線 M、および y軸 で囲まれた三角形の面積を求めなさい。', answerArea: 'calc', answer: '13.5 cm^2' }
                ]
            }
        ]
    },

    // --- 中3 数学 ---
    {
        id: 'math-j3-1',
        title: '展開と因数分解 徹底大問セット',
        grade: '中3',
        subject: '数学',
        unit: '多項式',
        level: '標準',
        pdfUrl: '#',
        questions: [
            {
                id: '1', title: '次の式を展開しなさい。', points: 5, items: [
                    { id: '1-1', text: '(x + 4)(x - 7)', answerArea: 'calc', answer: 'x^2 - 3x - 28' },
                    { id: '1-2', text: '(a - 6)(a - 2)', answerArea: 'calc', answer: 'a^2 - 8a + 12' },
                    { id: '1-3', text: '(2x - 3)^2', answerArea: 'calc', answer: '4x^2 - 12x + 9' },
                    { id: '1-4', text: '(3a + 5b)^2', answerArea: 'calc', answer: '9a^2 + 30ab + 25b^2' },
                    { id: '1-5', text: '(x + 8)(x - 8)', answerArea: 'calc', answer: 'x^2 - 64' },
                    { id: '1-6', text: '(4y - 3)(4y + 3)', answerArea: 'calc', answer: '16y^2 - 9' },
                ]
            },
            {
                id: '2', title: '次の式を因数分解しなさい。', points: 5, items: [
                    { id: '2-1', text: 'x^2 - 5x - 24', answerArea: 'calc', answer: '(x - 8)(x + 3)' },
                    { id: '2-2', text: 'a^2 + 10a + 21', answerArea: 'calc', answer: '(a + 3)(a + 7)' },
                    { id: '2-3', text: 'x^2 - 14x + 49', answerArea: 'calc', answer: '(x - 7)^2' },
                    { id: '2-4', text: '9a^2 + 24ab + 16b^2', answerArea: 'calc', answer: '(3a + 4b)^2' },
                    { id: '2-5', text: 'x^2 - 36', answerArea: 'calc', answer: '(x + 6)(x - 6)' },
                    { id: '2-6', text: '4a^2 - 25b^2', answerArea: 'calc', answer: '(2a + 5b)(2a - 5b)' },
                ]
            },
            {
                id: '3', title: '次の式を工夫して展開・因数分解しなさい。', points: 10, items: [
                    { id: '3-1', text: '(x + y - 3)(x + y + 3)  ※ x+y=A と置く', answerArea: 'calc', answer: 'x^2 + 2xy + y^2 - 9' },
                    { id: '3-2', text: 'ax^2 - 4a', answerArea: 'calc', answer: 'a(x+2)(x-2)' },
                    { id: '3-3', text: '3x^2 - 12x - 15', answerArea: 'calc', answer: '3(x-5)(x+1)' },
                ]
            }
        ]
    },
    {
        id: 'math-j3-2',
        title: '二次関数（y=ax^2）の利用',
        grade: '中3',
        subject: '数学',
        unit: '二次関数（y=ax^2）',
        level: '発展',
        pdfUrl: '#',
        questions: [
            {
                id: '1', title: '関数 y = ax^2 について答えなさい。', points: 10, items: [
                    { id: '1-1', text: 'グラフが点 (2, 12) を通るとき、この関数の式を求めなさい。', answerArea: 'calc', answer: 'y = 3x^2' },
                    { id: '1-2', text: '関数 y = -\\frac{1}{2}x^2 で、x の変域が -4 ≦ x ≦ 2 のときの y の変域を求めなさい。', answerArea: 'calc', answer: '-8 ≦ y ≦ 0' },
                    { id: '1-3', text: '関数 y = \\frac{1}{3}x^2 において、x の変域が a ≦ x ≦ 3 のとき、y の変域が 0 ≦ y ≦ 12 であった。a の値を求めなさい。', answerArea: 'calc', answer: 'a = -6' },
                ]
            },
            {
                id: '2', title: '変化の割合に関する問題に答えなさい。', points: 10, items: [
                    { id: '2-1', text: '関数 y = 2x^2 について、x の値が 1 から 4 まで増加するときの変化の割合を求めなさい。', answerArea: 'calc', answer: '10' },
                    { id: '2-2', text: '関数 y = ax^2 について、x の値が -3 から -1 まで増加するときの変化の割合が 8 であった。a の値を求めなさい。', answerArea: 'calc', answer: 'a = -2' }
                ]
            },
            {
                id: '3', title: '放物線と直線の交点や図形の応用問題に答えなさい。', points: 20, items: [
                    { id: '3-1', text: '関数 y = x^2 のグラフと直線 y = x + 6 の交点を A, B とする。点 A, B の座標を求めなさい。（ただし点 A の x座標は負とする）', answerArea: 'calc', answer: 'A(-2, 4), B(3, 9)' },
                    { id: '3-2', text: '上の△OAB の面積を求めなさい。', answerArea: 'long', answer: '15' },
                    { id: '3-3', text: '放物線 y = \\frac{1}{2}x^2 上に点 P をとる。点 P の x座標を t (t > 0) とするとき、点 P から x軸に引いた垂線と x軸との交点を Q とする。PQ の長さが 8 になるときの t の値を求めなさい。', answerArea: 'long', answer: 't = 4' }
                ]
            }
        ]
    },

    // --- 中1 英語 ---
    {
        id: 'eng-j1-1',
        title: 'be動詞と一般動詞の使い分け マスター',
        grade: '中1',
        subject: '英語',
        unit: 'be動詞',
        level: '基礎',
        pdfUrl: '#',
        questions: [
            {
                id: '1', title: '次の日本語に合うように、英文の(  )に適語を入れなさい。', points: 5, items: [
                    { id: '1-1', text: '私は中学生です。\\nI (         ) a junior high school student.', answerArea: 'blank', answer: 'am' },
                    { id: '1-2', text: 'あなたはサッカーの選手ですか。\\n(         ) (         ) a soccer player?', answerArea: 'blank', answer: 'Are you' },
                    { id: '1-3', text: '彼女はテニスが好きではありません。\\nShe (         ) (         ) like tennis.', answerArea: 'blank', answer: 'does not' },
                    { id: '1-4', text: 'あなたは日曜日、公園に行きますか。\\n(         ) you (         ) to the park on Sundays?', answerArea: 'blank', answer: 'Do, go' },
                    { id: '1-5', text: '彼らはオーストラリア出身です。\\nThey (         ) (         ) Australia.', answerArea: 'blank', answer: 'are from' },
                    { id: '1-6', text: 'ケンは英語を熱心に勉強します。\\nKen (         ) English hard.', answerArea: 'blank', answer: 'studies' },
                ]
            },
            {
                id: '2', title: '次の英文を否定文に書きかえなさい。', points: 10, items: [
                    { id: '2-1', text: 'He is my math teacher.', answerArea: 'short', answer: 'He is not my math teacher.' },
                    { id: '2-2', text: 'I play baseball in the park.', answerArea: 'short', answer: 'I do not play baseball in the park.' },
                    { id: '2-3', text: 'My sister likes music.', answerArea: 'short', answer: 'My sister does not like music.' },
                ]
            },
            {
                id: '3', title: '次の英文を日本語に訳しなさい。', points: 10, items: [
                    { id: '3-1', text: 'Are they your friends from Canada?', answerArea: 'short', answer: '彼らはあなたのカナダ出身の友達ですか。' },
                    { id: '3-2', text: 'My brother plays the guitar very well.', answerArea: 'short', answer: '私の兄弟はとても上手にギターを弾きます。' },
                    { id: '3-3', text: 'Does Kenji live in Tokyo?', answerArea: 'short', answer: 'ケンジは東京に住んでいますか。' },
                ]
            }
        ]
    },
    {
        id: 'eng-j1-2',
        title: '現在進行形と助動詞 can',
        grade: '中1',
        subject: '英語',
        unit: '現在進行形',
        level: '標準',
        pdfUrl: '#',
        questions: [
            {
                id: '1', title: '次の指示に従って英文を書きかえなさい。', points: 10, items: [
                    { id: '1-1', text: 'Ken runs fast. (「今走っているところだ」という現在進行形の文に)', answerArea: 'short', answer: 'Ken is running fast.' },
                    { id: '1-2', text: 'Taro and Jiro use the computer. (現在進行形の疑問文に)', answerArea: 'short', answer: 'Are Taro and Jiro using the computer?' },
                    { id: '1-3', text: 'I can swim across the river. (否定文に)', answerArea: 'short', answer: 'I cannot swim across the river.' },
                    { id: '1-4', text: 'They are studying math. (下線部をたずねる疑問文に)\\n※mathが下線部', answerArea: 'short', answer: 'What are they studying?' },
                    { id: '1-5', text: 'She plays tennis. (「テニスをすることができますか」という文に)', answerArea: 'short', answer: 'Can she play tennis?' },
                ]
            },
            {
                id: '2', title: '次の単語を並べ替えて意味の通る英文にしなさい。（不要な語が1つ含まれているものもあります）', points: 10, items: [
                    { id: '2-1', text: 'で / ピアノ / は / 弾くこと / あなた / が / できますか / ？\\n( you / play / can / piano / the / does )?', answerArea: 'short', answer: 'Can you play the piano?' },
                    { id: '2-2', text: '今 / 彼女 / 手紙 / は / 書いています / を / 。\\n( writing / letter / she / is / a / now / writes ).', answerArea: 'short', answer: 'She is writing a letter now.' },
                    { id: '2-3', text: '何 / ケン / していますか / 今 / は / ？\\n( doing / is / what / Ken / does / now )?', answerArea: 'short', answer: 'What is Ken doing now?' },
                ]
            }
        ]
    },

    // --- 中2 英語 ---
    {
        id: 'eng-j2-1',
        title: '不定詞 総合演習（名・形・副）',
        grade: '中2',
        subject: '英語',
        unit: '不定詞',
        level: '標準',
        pdfUrl: '#',
        questions: [
            {
                id: '1', title: '次の日本文に合うように、英文を完成させなさい。', points: 5, items: [
                    { id: '1-1', text: '私の夢は医者になることです。\\nMy dream is (         ) (         ) a doctor.', answerArea: 'blank', answer: 'to be' },
                    { id: '1-2', text: '彼らは英語を話すことが好きです。\\nThey like (         ) (         ) English.', answerArea: 'blank', answer: 'to speak' },
                    { id: '1-3', text: '私には今日すべき宿題がたくさんあります。\\nI have a lot of homework (         ) (         ) today.', answerArea: 'blank', answer: 'to do' },
                    { id: '1-4', text: '何か冷たい飲み物をくれませんか。\\nWill you give me something cold (         ) (         )?', answerArea: 'blank', answer: 'to drink' },
                    { id: '1-5', text: '彼は英語を勉強するためにカナダへ行きました。\\nHe went to Canada (         ) (         ) English.', answerArea: 'blank', answer: 'to study' },
                    { id: '1-6', text: '私たちはあなたに会えてとても嬉しいです。\\nWe are very happy (         ) (         ) you.', answerArea: 'blank', answer: 'to see' },
                ]
            },
            {
                id: '2', title: '次の2つの文がほぼ同じ意味になるように、（　）に適語を入れなさい。', points: 10, items: [
                    { id: '2-1', text: 'I want to visit Kyoto.\\nI (         ) (         ) to visit Kyoto.', answerArea: 'blank', answer: 'would like' },
                    { id: '2-2', text: 'Why did you go to the library?\\n(         ) did you go to the library (         )?', answerArea: 'blank', answer: 'What, for' },
                ]
            },
            {
                id: '3', title: '次の英文を日本語に訳しなさい。', points: 10, items: [
                    { id: '3-1', text: 'I am glad to see you again.', answerArea: 'short', answer: '私はあなたにまた会えて嬉しいです。' },
                    { id: '3-2', text: 'She needs a lot of books to read.', answerArea: 'short', answer: '彼女は読むべき本がたくさん必要です。' },
                    { id: '3-3', text: 'To learn math is interesting for me.', answerArea: 'short', answer: '私にとって数学を学ぶことはおもしろいです。' },
                ]
            }
        ]
    },
    {
        id: 'eng-j2-2',
        title: '比較（原級・比較級・最上級）ドリル',
        grade: '中2',
        subject: '英語',
        unit: '比較',
        level: '基礎',
        pdfUrl: '#',
        questions: [
            {
                id: '1', title: '次の文の(  )内の語を、文脈に合うように適する形に変えなさい。', points: 10, items: [
                    { id: '1-1', text: 'Ken is ( tall ) than Bob.', answerArea: 'short', answer: 'taller' },
                    { id: '1-2', text: 'This book is the ( interesting ) of the three.', answerArea: 'short', answer: 'most interesting' },
                    { id: '1-3', text: 'I can swim as ( fast ) as my brother.', answerArea: 'short', answer: 'fast' },
                    { id: '1-4', text: 'Mt. Fuji is the ( high ) mountain in Japan.', answerArea: 'short', answer: 'highest' },
                    { id: '1-5', text: 'Tom speaks Japanese ( well ) than I do.', answerArea: 'short', answer: 'better' },
                ]
            },
            {
                id: '2', title: '次の指示に従って英文を書きかえなさい。', points: 10, items: [
                    { id: '2-1', text: 'Math is easier than Science. (Science を主語にしてほぼ同じ意味に)', answerArea: 'short', answer: 'Science is more difficult than Math. / Science is harder than Math.' },
                    { id: '2-2', text: 'Mike is the fastest runner in his class. (「他のどの〜よりも」の形を使ってほぼ同じ意味に)', answerArea: 'short', answer: 'Mike runs faster than any other student in his class.' },
                ]
            },
            {
                id: '3', title: '次の日本語を英語に直しなさい。', points: 15, items: [
                    { id: '3-1', text: 'ロシアは世界で最も大きな国です。', answerArea: 'short', answer: 'Russia is the largest country in the world.' },
                    { id: '3-2', text: 'あなたはイヌとネコ、どちらのほうが好きですか。', answerArea: 'short', answer: 'Which do you like better, dogs or cats?' },
                    { id: '3-3', text: 'このボールはあのボールと同じくらい大きいです。', answerArea: 'short', answer: 'This ball is as big as that one.' },
                ]
            }
        ]
    },

    // --- 中3 英語 ---
    {
        id: 'eng-j3-1',
        title: '現在完了形 徹底トレーニング',
        grade: '中3',
        subject: '英語',
        unit: '現在完了',
        level: '標準',
        pdfUrl: '#',
        questions: [
            {
                id: '1', title: '次の日本語に合う文になるように、（　）に適語を入れなさい。', points: 5, items: [
                    { id: '1-1', text: '私は先週からずっと忙しいです。\\nI (         ) (         ) busy since last week.', answerArea: 'blank', answer: 'have been' },
                    { id: '1-2', text: 'あなたは今までに京都を訪れたことがありますか。\\n(         ) you (         ) visited Kyoto?', answerArea: 'blank', answer: 'Have ever' },
                    { id: '1-3', text: '彼はまだ宿題を終えていません。\\nHe (         ) not finished his homework (         ).', answerArea: 'blank', answer: 'has yet' },
                    { id: '1-4', text: '私たちはちょうど昼食を食べ終えたところです。\\nWe have (         ) (         ) our lunch.', answerArea: 'blank', answer: 'just finished / just eaten' },
                    { id: '1-5', text: 'ケンは今までに一度もその映画を見たことがありません。\\nKen (         ) (         ) seen the movie.', answerArea: 'blank', answer: 'has never' },
                ]
            },
            {
                id: '2', title: '次の各組の文がほぼ同じ意味になるように、（　）に適語を入れなさい。', points: 10, items: [
                    { id: '2-1', text: 'Ken went to America. He is not here now.\\nKen (         ) (         ) to America.', answerArea: 'blank', answer: 'has gone' },
                    { id: '2-2', text: 'When did you come to Japan?\\nHow (         ) (         ) you been in Japan?', answerArea: 'blank', answer: 'long have' },
                ]
            },
            {
                id: '3', title: '次の英文を日本語に訳しなさい。', points: 10, items: [
                    { id: '3-1', text: 'I have known him for ten years.', answerArea: 'short', answer: '私は10年間彼を知っています（知り合いです）。' },
                    { id: '3-2', text: 'She has already cleaned her room.', answerArea: 'short', answer: '彼女はすでに部屋を掃除してしまいました。' },
                    { id: '3-3', text: 'Have you ever eaten French food?', answerArea: 'short', answer: 'あなたは今までにフランス料理を食べたことがありますか。' },
                ]
            }
        ]
    },
    {
        id: 'eng-j3-2',
        title: '関係代名詞の理解と作文',
        grade: '中3',
        subject: '英語',
        unit: '関係代名詞',
        level: '発展',
        pdfUrl: '#',
        questions: [
            {
                id: '1', title: '次の2文を、関係代名詞を使って1文に結びなさい。', points: 10, items: [
                    { id: '1-1', text: 'I have a friend. He lives in Australia.', answerArea: 'long', answer: 'I have a friend who lives in Australia.' },
                    { id: '1-2', text: 'This is the book. I bought it yesterday.', answerArea: 'long', answer: 'This is the book which[that] I bought yesterday.' },
                    { id: '1-3', text: 'The man was very kind. He helped me.', answerArea: 'long', answer: 'The man who helped me was very kind.' },
                    { id: '1-4', text: 'The boy is my brother. You saw him yesterday.', answerArea: 'long', answer: 'The boy whom[who/that] you saw yesterday is my brother.' },
                ]
            },
            {
                id: '2', title: '次の日本語を英語に直しなさい。', points: 15, items: [
                    { id: '2-1', text: 'あそこで走っている少年は私の弟です。', answerArea: 'long', answer: 'The boy who is running over there is my brother.' },
                    { id: '2-2', text: 'これは私がカナダで撮った写真です。', answerArea: 'long', answer: 'This is a picture which[that] I took in Canada.' },
                    { id: '2-3', text: '私には、英語を上手に話すことができる友達がいます。', answerArea: 'long', answer: 'I have a friend who can speak English well.' },
                ]
            }
        ]
    }
];
