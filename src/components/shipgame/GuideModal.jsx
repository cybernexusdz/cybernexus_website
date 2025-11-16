import React, { useState, useEffect } from "react";

const translations = {
  en: {
    title: "🚢 Battleship Game Guide",
    close: "Close",
    slides: [
      {
        title: "🎯 How to Play",
        content: (
          <>
            <p>
              <strong>
                Battleship is a strategy game where you try to sink your
                opponent's ships before they sink yours.
              </strong>
            </p>
            <ul>
              <li>You and the bot each have 6 ships placed on a 10x10 grid</li>
              <li>
                On your turn, click on the bot's grid to attack a position
              </li>
              <li>If you hit a ship, you get another turn</li>
              <li>If you miss, it's the bot's turn</li>
              <li>The first player to sink all enemy ships wins!</li>
            </ul>
          </>
        ),
      },
      {
        title: "🚢 Ship Types",
        content: (
          <>
            <p>Each player has 6 ships of different sizes and colors:</p>
            <div className="grid grid-cols-2 gap-2.5 mt-4">
              <div
                className="p-3 bg-primary/10 border-2 border-primary/30 rounded-[10px] text-left transition-all text-base-content flex items-center gap-3 relative hover:bg-primary/20 hover:border-primary/50 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_hsl(var(--p)/0.2)]"
                style={{ borderLeft: "4px solid #FF6B6B" }}
              >
                <div
                  className="w-6 h-6 rounded border-2 border-black/20 shadow-[0_2px_4px_rgba(0,0,0,0.1)] flex-shrink-0"
                  style={{ backgroundColor: "#FF6B6B" }}
                ></div>
                <div>
                  <strong>Carrier</strong>
                  <br />
                  Size: 5 cells
                </div>
              </div>
              <div
                className="p-3 bg-primary/10 border-2 border-primary/30 rounded-[10px] text-left transition-all text-base-content flex items-center gap-3 relative hover:bg-primary/20 hover:border-primary/50 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_hsl(var(--p)/0.2)]"
                style={{ borderLeft: "4px solid #4ECDC4" }}
              >
                <div
                  className="w-6 h-6 rounded border-2 border-black/20 shadow-[0_2px_4px_rgba(0,0,0,0.1)] flex-shrink-0"
                  style={{ backgroundColor: "#4ECDC4" }}
                ></div>
                <div>
                  <strong>Battleship</strong>
                  <br />
                  Size: 4 cells
                </div>
              </div>
              <div
                className="p-3 bg-primary/10 border-2 border-primary/30 rounded-[10px] text-left transition-all text-base-content flex items-center gap-3 relative hover:bg-primary/20 hover:border-primary/50 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_hsl(var(--p)/0.2)]"
                style={{ borderLeft: "4px solid #45B7D1" }}
              >
                <div
                  className="w-6 h-6 rounded border-2 border-black/20 shadow-[0_2px_4px_rgba(0,0,0,0.1)] flex-shrink-0"
                  style={{ backgroundColor: "#45B7D1" }}
                ></div>
                <div>
                  <strong>Destroyer</strong>
                  <br />
                  Size: 4 cells
                </div>
              </div>
              <div
                className="p-3 bg-primary/10 border-2 border-primary/30 rounded-[10px] text-left transition-all text-base-content flex items-center gap-3 relative hover:bg-primary/20 hover:border-primary/50 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_hsl(var(--p)/0.2)]"
                style={{ borderLeft: "4px solid #96CEB4" }}
              >
                <div
                  className="w-6 h-6 rounded border-2 border-black/20 shadow-[0_2px_4px_rgba(0,0,0,0.1)] flex-shrink-0"
                  style={{ backgroundColor: "#96CEB4" }}
                ></div>
                <div>
                  <strong>Submarine</strong>
                  <br />
                  Size: 3 cells
                </div>
              </div>
              <div
                className="p-3 bg-primary/10 border-2 border-primary/30 rounded-[10px] text-left transition-all text-base-content flex items-center gap-3 relative hover:bg-primary/20 hover:border-primary/50 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_hsl(var(--p)/0.2)]"
                style={{ borderLeft: "4px solid #FFEAA7" }}
              >
                <div
                  className="w-6 h-6 rounded border-2 border-black/20 shadow-[0_2px_4px_rgba(0,0,0,0.1)] flex-shrink-0"
                  style={{ backgroundColor: "#FFEAA7" }}
                ></div>
                <div>
                  <strong>Cruiser</strong>
                  <br />
                  Size: 3 cells
                </div>
              </div>
              <div
                className="p-3 bg-primary/10 border-2 border-primary/30 rounded-[10px] text-left transition-all text-base-content flex items-center gap-3 relative hover:bg-primary/20 hover:border-primary/50 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_hsl(var(--p)/0.2)]"
                style={{ borderLeft: "4px solid #DDA0DD" }}
              >
                <div
                  className="w-6 h-6 rounded border-2 border-black/20 shadow-[0_2px_4px_rgba(0,0,0,0.1)] flex-shrink-0"
                  style={{ backgroundColor: "#DDA0DD" }}
                ></div>
                <div>
                  <strong>Patrol Boat</strong>
                  <br />
                  Size: 2 cells
                </div>
              </div>
            </div>
          </>
        ),
      },
      {
        title: "📍 Grid Symbols & Colors",
        content: (
          <>
            <p>Understanding what you see on the grids:</p>
            <div className="flex flex-col gap-3 mt-4">
              <div className="flex items-center gap-4 p-3 bg-accent/5 rounded-[10px] border border-primary/20 transition-all hover:bg-accent/10 hover:border-primary/40 hover:translate-x-1">
                <div
                  className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.15)] border-2 border-black/10"
                  style={{
                    backgroundColor: "rgba(59, 224, 254, 0.2)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                  }}
                ></div>
                <div>
                  <strong>🔵 Blue/Cyan cell</strong>
                  <br />
                  <span className="text-base-content/70 text-sm">
                    Empty water, not attacked yet
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-accent/5 rounded-[10px] border border-primary/20 transition-all hover:bg-accent/10 hover:border-primary/40 hover:translate-x-1">
                <div
                  className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.15)] border-2 border-black/10"
                  style={{ backgroundColor: "#000000" }}
                ></div>
                <div>
                  <strong>⚫ Black cell</strong>
                  <br />
                  <span className="text-base-content/70 text-sm">
                    Your ship (only visible on your grid)
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-accent/5 rounded-[10px] border border-primary/20 transition-all hover:bg-accent/10 hover:border-primary/40 hover:translate-x-1">
                <div
                  className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.15)] border-2 border-black/10"
                  style={{
                    backgroundColor: "rgba(255, 69, 0, 0.6)",
                    border: "1px solid rgba(255, 69, 0, 0.8)",
                  }}
                >
                  <span className="text-xl">🔥</span>
                </div>
                <div>
                  <strong>🔥 Fire icon</strong>
                  <br />
                  <span className="text-base-content/70 text-sm">
                    Hit! You or the bot hit a ship
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-accent/5 rounded-[10px] border border-primary/20 transition-all hover:bg-accent/10 hover:border-primary/40 hover:translate-x-1">
                <div
                  className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.15)] border-2 border-black/10"
                  style={{
                    backgroundColor: "rgba(192, 192, 192, 0.4)",
                    border: "1px solid rgba(192, 192, 192, 0.6)",
                  }}
                >
                  <span className="text-xl">💧</span>
                </div>
                <div>
                  <strong>💧 Water drop</strong>
                  <br />
                  <span className="text-base-content/70 text-sm">
                    Miss! The attack didn't hit anything
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-accent/5 rounded-[10px] border border-primary/20 transition-all hover:bg-accent/10 hover:border-primary/40 hover:translate-x-1">
                <div
                  className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.15)] border-2 border-black/10"
                  style={{ backgroundColor: "#FF6B6B" }}
                ></div>
                <div>
                  <strong>🚢 Colored cell</strong>
                  <br />
                  <span className="text-base-content/70 text-sm">
                    Sunk ship (shows ship's color when fully sunk)
                  </span>
                </div>
              </div>
            </div>
          </>
        ),
      },
      {
        title: "💡 Strategy Tips",
        content: (
          <>
            <p>
              <strong>Improve your chances of winning:</strong>
            </p>
            <ul>
              <li>
                Start with a systematic search pattern (like a grid pattern)
              </li>
              <li>
                When you get a hit, target adjacent cells to find the ship's
                direction
              </li>
              <li>
                Once you know the direction, continue in that line to sink the
                ship
              </li>
              <li>Don't attack the same spot twice</li>
              <li>Remember: ships can be placed horizontally or vertically</li>
              <li>Watch the bot's attacks to learn their strategy</li>
              <li>Keep track of how many ships are left</li>
            </ul>
          </>
        ),
      },
      {
        title: "📋 Game Rules",
        content: (
          <>
            <p>
              <strong>Important rules to remember:</strong>
            </p>
            <ul>
              <li>Ships cannot overlap or be placed diagonally</li>
              <li>Ships cannot be placed adjacent to each other (touching)</li>
              <li>
                When you hit a ship, you get another turn (keep attacking!)
              </li>
              <li>When you miss, your turn ends and the bot attacks</li>
              <li>A ship is sunk when all its cells are hit</li>
              <li>The game ends when one player sinks all 6 enemy ships</li>
              <li>You can reset the game at any time using the Reset button</li>
              <li>
                The bot uses smart AI that targets adjacent cells after hits
              </li>
            </ul>
          </>
        ),
      },
    ],
  },
  ar: {
    title: "🚢 دليل لعبة معركة السفن",
    close: "إغلاق",
    slides: [
      {
        title: "🎯 كيفية اللعب",
        content: (
          <>
            <p>
              <strong>
                معركة السفن هي لعبة استراتيجية حيث تحاول إغراق سفن خصمك قبل أن
                يغرق سفنك.
              </strong>
            </p>
            <ul>
              <li>لديك أنت والروبوت 6 سفن موضوعة على شبكة 10x10</li>
              <li>في دورك، انقر على شبكة الروبوت لمهاجمة موقع</li>
              <li>إذا أصبت سفينة، تحصل على دور آخر</li>
              <li>إذا أخطأت، يأتي دور الروبوت</li>
              <li>الفائز هو أول لاعب يغرق جميع سفن العدو!</li>
            </ul>
          </>
        ),
      },
      {
        title: "🚢 أنواع السفن",
        content: (
          <>
            <p>كل لاعب لديه 6 سفن بأحجام مختلفة:</p>
            <div className="grid grid-cols-2 gap-2.5 mt-4">
              <div
                className="p-3 bg-primary/10 border-2 border-primary/30 rounded-[10px] text-right transition-all text-base-content flex items-center gap-3 relative hover:bg-primary/20 hover:border-primary/50 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_hsl(var(--p)/0.2)]"
                style={{ borderLeft: "4px solid #FF6B6B" }}
              >
                <div
                  className="w-6 h-6 rounded border-2 border-black/20 shadow-[0_2px_4px_rgba(0,0,0,0.1)] flex-shrink-0"
                  style={{ backgroundColor: "#FF6B6B" }}
                ></div>
                <div>
                  <strong>حاملة الطائرات</strong>
                  <br />
                  الحجم: 5 خلايا
                </div>
              </div>
              <div
                className="p-3 bg-primary/10 border-2 border-primary/30 rounded-[10px] text-right transition-all text-base-content flex items-center gap-3 relative hover:bg-primary/20 hover:border-primary/50 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_hsl(var(--p)/0.2)]"
                style={{ borderLeft: "4px solid #4ECDC4" }}
              >
                <div
                  className="w-6 h-6 rounded border-2 border-black/20 shadow-[0_2px_4px_rgba(0,0,0,0.1)] flex-shrink-0"
                  style={{ backgroundColor: "#4ECDC4" }}
                ></div>
                <div>
                  <strong>سفينة حربية</strong>
                  <br />
                  الحجم: 4 خلايا
                </div>
              </div>
              <div
                className="p-3 bg-primary/10 border-2 border-primary/30 rounded-[10px] text-right transition-all text-base-content flex items-center gap-3 relative hover:bg-primary/20 hover:border-primary/50 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_hsl(var(--p)/0.2)]"
                style={{ borderLeft: "4px solid #45B7D1" }}
              >
                <div
                  className="w-6 h-6 rounded border-2 border-black/20 shadow-[0_2px_4px_rgba(0,0,0,0.1)] flex-shrink-0"
                  style={{ backgroundColor: "#45B7D1" }}
                ></div>
                <div>
                  <strong>مدمرة</strong>
                  <br />
                  الحجم: 4 خلايا
                </div>
              </div>
              <div
                className="p-3 bg-primary/10 border-2 border-primary/30 rounded-[10px] text-right transition-all text-base-content flex items-center gap-3 relative hover:bg-primary/20 hover:border-primary/50 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_hsl(var(--p)/0.2)]"
                style={{ borderLeft: "4px solid #96CEB4" }}
              >
                <div
                  className="w-6 h-6 rounded border-2 border-black/20 shadow-[0_2px_4px_rgba(0,0,0,0.1)] flex-shrink-0"
                  style={{ backgroundColor: "#96CEB4" }}
                ></div>
                <div>
                  <strong>غواصة</strong>
                  <br />
                  الحجم: 3 خلايا
                </div>
              </div>
              <div
                className="p-3 bg-primary/10 border-2 border-primary/30 rounded-[10px] text-right transition-all text-base-content flex items-center gap-3 relative hover:bg-primary/20 hover:border-primary/50 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_hsl(var(--p)/0.2)]"
                style={{ borderLeft: "4px solid #FFEAA7" }}
              >
                <div
                  className="w-6 h-6 rounded border-2 border-black/20 shadow-[0_2px_4px_rgba(0,0,0,0.1)] flex-shrink-0"
                  style={{ backgroundColor: "#FFEAA7" }}
                ></div>
                <div>
                  <strong>طراد</strong>
                  <br />
                  الحجم: 3 خلايا
                </div>
              </div>
              <div
                className="p-3 bg-primary/10 border-2 border-primary/30 rounded-[10px] text-right transition-all text-base-content flex items-center gap-3 relative hover:bg-primary/20 hover:border-primary/50 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_hsl(var(--p)/0.2)]"
                style={{ borderLeft: "4px solid #DDA0DD" }}
              >
                <div
                  className="w-6 h-6 rounded border-2 border-black/20 shadow-[0_2px_4px_rgba(0,0,0,0.1)] flex-shrink-0"
                  style={{ backgroundColor: "#DDA0DD" }}
                ></div>
                <div>
                  <strong>زورق دورية</strong>
                  <br />
                  الحجم: 2 خلايا
                </div>
              </div>
            </div>
          </>
        ),
      },
      {
        title: "📍 رموز الشبكة",
        content: (
          <>
            <p>فهم ما تراه على الشبكات:</p>
            <div className="flex flex-col gap-3 mt-4">
              <div className="flex items-center gap-4 p-3 bg-accent/5 rounded-[10px] border border-primary/20 transition-all hover:bg-accent/10 hover:border-primary/40 hover:-translate-x-1 flex-row-reverse">
                <div
                  className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.15)] border-2 border-black/10"
                  style={{
                    backgroundColor: "rgba(59, 224, 254, 0.2)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                  }}
                ></div>
                <div>
                  <strong>🔵 خلية زرقاء/سيان</strong>
                  <br />
                  <span className="text-base-content/70 text-sm">
                    ماء فارغ، لم يتم مهاجمته بعد
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-accent/5 rounded-[10px] border border-primary/20 transition-all hover:bg-accent/10 hover:border-primary/40 hover:-translate-x-1 flex-row-reverse">
                <div
                  className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.15)] border-2 border-black/10"
                  style={{ backgroundColor: "#000000" }}
                ></div>
                <div>
                  <strong>⚫ خلية سوداء</strong>
                  <br />
                  <span className="text-base-content/70 text-sm">
                    سفينتك (مرئية فقط على شبكتك)
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-accent/5 rounded-[10px] border border-primary/20 transition-all hover:bg-accent/10 hover:border-primary/40 hover:-translate-x-1 flex-row-reverse">
                <div
                  className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.15)] border-2 border-black/10"
                  style={{
                    backgroundColor: "rgba(255, 69, 0, 0.6)",
                    border: "1px solid rgba(255, 69, 0, 0.8)",
                  }}
                >
                  <span className="text-xl">🔥</span>
                </div>
                <div>
                  <strong>🔥 أيقونة نار</strong>
                  <br />
                  <span className="text-base-content/70 text-sm">
                    إصابة! أنت أو الروبوت أصبت سفينة
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-accent/5 rounded-[10px] border border-primary/20 transition-all hover:bg-accent/10 hover:border-primary/40 hover:-translate-x-1 flex-row-reverse">
                <div
                  className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.15)] border-2 border-black/10"
                  style={{
                    backgroundColor: "rgba(192, 192, 192, 0.4)",
                    border: "1px solid rgba(192, 192, 192, 0.6)",
                  }}
                >
                  <span className="text-xl">💧</span>
                </div>
                <div>
                  <strong>💧 قطرة ماء</strong>
                  <br />
                  <span className="text-base-content/70 text-sm">
                    إخطاء! الهجوم لم يصب شيئاً
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-accent/5 rounded-[10px] border border-primary/20 transition-all hover:bg-accent/10 hover:border-primary/40 hover:-translate-x-1 flex-row-reverse">
                <div
                  className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.15)] border-2 border-black/10"
                  style={{ backgroundColor: "#FF6B6B" }}
                ></div>
                <div>
                  <strong>🚢 خلية ملونة</strong>
                  <br />
                  <span className="text-base-content/70 text-sm">
                    سفينة غارقة (يظهر لون السفينة عند الغرق الكامل)
                  </span>
                </div>
              </div>
            </div>
          </>
        ),
      },
      {
        title: "💡 نصائح استراتيجية",
        content: (
          <>
            <p>
              <strong>حسّن فرصك في الفوز:</strong>
            </p>
            <ul>
              <li>ابدأ بنمط بحث منهجي (مثل نمط الشبكة)</li>
              <li>
                عندما تصيب، استهدف الخلايا المجاورة للعثور على اتجاه السفينة
              </li>
              <li>بمجرد معرفة الاتجاه، استمر في هذا الخط لإغراق السفينة</li>
              <li>لا تهاجم نفس المكان مرتين</li>
              <li>تذكر: يمكن وضع السفن أفقيًا أو عموديًا</li>
              <li>راقب هجمات الروبوت لتعلم استراتيجيته</li>
              <li>تتبع عدد السفن المتبقية</li>
            </ul>
          </>
        ),
      },
      {
        title: "📋 قواعد اللعبة",
        content: (
          <>
            <p>
              <strong>قواعد مهمة يجب تذكرها:</strong>
            </p>
            <ul>
              <li>لا يمكن أن تتداخل السفن أو توضع قطريًا</li>
              <li>لا يمكن وضع السفن بجانب بعضها البعض (متلامسة)</li>
              <li>عندما تصيب سفينة، تحصل على دور آخر (استمر في الهجوم!)</li>
              <li>عندما تخطئ، ينتهي دورك ويهاجم الروبوت</li>
              <li>تُغرق السفينة عندما يتم ضرب جميع خلاياها</li>
              <li>
                تنتهي اللعبة عندما يغرق أحد اللاعبين جميع السفن الستة للعدو
              </li>
              <li>
                يمكنك إعادة تعيين اللعبة في أي وقت باستخدام زر إعادة التعيين
              </li>
              <li>
                يستخدم الروبوت ذكاءً اصطناعيًا ذكيًا يستهدف الخلايا المجاورة بعد
                الإصابات
              </li>
            </ul>
          </>
        ),
      },
    ],
  },
};

function GuideModal({ show, onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("guideLanguage") || "en";
  });

  useEffect(() => {
    if (show) {
      setCurrentSlide(0);
    }
  }, [show]);

  useEffect(() => {
    localStorage.setItem("guideLanguage", language);
  }, [language]);

  if (!show) return null;

  const langData = translations[language];
  const totalSlides = langData.slides.length;

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[1000] p-5"
      onClick={onClose}
    >
      <div
        className="bg-base-100/95 backdrop-blur-xl rounded-[20px] max-w-[800px] w-full max-h-[90vh] flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.5)] border-2 border-primary/30"
        onClick={(e) => e.stopPropagation()}
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <div className="flex items-center justify-between p-5 border-b-2 border-primary/20 flex-wrap gap-2.5 bg-gradient-to-br from-primary/10 to-info/10 rounded-t-[20px]">
          <h5 className="m-0 flex-1 text-2xl bg-gradient-to-br from-primary to-info bg-clip-text text-transparent font-bold">
            {langData.title}
          </h5>
          <div className="flex gap-2.5 items-center">
            <button
              className={`px-3.5 py-1.5 border-2 rounded-lg cursor-pointer text-sm font-semibold transition-all ${
                language === "en"
                  ? "bg-gradient-to-br from-primary to-info text-primary-content border-transparent -translate-y-0.5 shadow-[0_4px_12px_hsl(var(--p)/0.4)]"
                  : "border-primary bg-transparent text-primary hover:bg-gradient-to-br hover:from-primary hover:to-info hover:text-primary-content hover:border-transparent hover:-translate-y-0.5 hover:shadow-[0_4px_12px_hsl(var(--p)/0.4)]"
              }`}
              onClick={() => setLanguage("en")}
            >
              English
            </button>
            <button
              className={`px-3.5 py-1.5 border-2 rounded-lg cursor-pointer text-sm font-semibold transition-all ${
                language === "ar"
                  ? "bg-gradient-to-br from-primary to-info text-primary-content border-transparent -translate-y-0.5 shadow-[0_4px_12px_hsl(var(--p)/0.4)]"
                  : "border-primary bg-transparent text-primary hover:bg-gradient-to-br hover:from-primary hover:to-info hover:text-primary-content hover:border-transparent hover:-translate-y-0.5 hover:shadow-[0_4px_12px_hsl(var(--p)/0.4)]"
              }`}
              onClick={() => setLanguage("ar")}
            >
              العربية
            </button>
          </div>
          <button
            className="bg-none border-none text-3xl cursor-pointer p-0 w-[30px] h-[30px] text-base-content transition-all hover:text-primary hover:scale-110"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="p-5 overflow-y-auto flex-1 min-h-[400px]">
          <div className="relative min-h-[400px]">
            <div className="text-center p-5 min-h-[400px]">
              <h4 className="text-base-content mb-5 text-[1.8em] font-bold bg-gradient-to-br from-primary to-info bg-clip-text text-transparent">
                {langData.slides[currentSlide].title}
              </h4>
              {langData.slides[currentSlide].content}
            </div>
            <div className="flex justify-center gap-2.5 mt-5">
              {langData.slides.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full border-none cursor-pointer transition-all bg-gradient-to-br from-primary to-info ${
                    currentSlide === index
                      ? "opacity-100 scale-[1.3] shadow-[0_0_8px_hsl(var(--p)/0.6)]"
                      : "opacity-40"
                  }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
            <button
              className={`absolute top-1/2 -translate-y-1/2 bg-gradient-to-br from-primary to-info text-primary-content border-none w-11 h-11 rounded-full text-[26px] font-bold cursor-pointer flex items-center justify-center transition-all z-10 shadow-[0_4px_12px_hsl(var(--p)/0.4)] hover:scale-110 hover:shadow-[0_6px_20px_hsl(var(--p)/0.6)] disabled:opacity-50 disabled:cursor-not-allowed ${
                language === "ar" ? "right-2.5" : "left-2.5"
              }`}
              onClick={prevSlide}
              disabled={currentSlide === 0}
            >
              ‹
            </button>
            <button
              className={`absolute top-1/2 -translate-y-1/2 bg-gradient-to-br from-primary to-info text-primary-content border-none w-11 h-11 rounded-full text-[26px] font-bold cursor-pointer flex items-center justify-center transition-all z-10 shadow-[0_4px_12px_hsl(var(--p)/0.4)] hover:scale-110 hover:shadow-[0_6px_20px_hsl(var(--p)/0.6)] disabled:opacity-50 disabled:cursor-not-allowed ${
                language === "ar" ? "left-2.5" : "right-2.5"
              }`}
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1}
            >
              ›
            </button>
          </div>
        </div>
        <div className="py-4 px-5 border-t-2 border-primary/20 flex justify-end bg-gradient-to-br from-primary/5 to-info/5 rounded-b-[20px]">
          <button
            className="bg-gradient-to-br from-primary to-info text-primary-content border-none py-2.5 px-6 rounded-[10px] font-semibold transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_hsl(var(--p)/0.5)]"
            onClick={onClose}
          >
            {langData.close}
          </button>
        </div>
      </div>
    </div>
  );
}

export default GuideModal;
