import React, { useState, useEffect } from "react";
import "./GuideModal.css";

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
            <div className="ship-list">
              <div className="ship-item" style={{ borderLeft: "4px solid #FF6B6B" }}>
                <div className="ship-color-demo" style={{ backgroundColor: "#FF6B6B" }}></div>
                <strong>Carrier</strong>
                <br />
                Size: 5 cells
              </div>
              <div className="ship-item" style={{ borderLeft: "4px solid #4ECDC4" }}>
                <div className="ship-color-demo" style={{ backgroundColor: "#4ECDC4" }}></div>
                <strong>Battleship</strong>
                <br />
                Size: 4 cells
              </div>
              <div className="ship-item" style={{ borderLeft: "4px solid #45B7D1" }}>
                <div className="ship-color-demo" style={{ backgroundColor: "#45B7D1" }}></div>
                <strong>Destroyer</strong>
                <br />
                Size: 4 cells
              </div>
              <div className="ship-item" style={{ borderLeft: "4px solid #96CEB4" }}>
                <div className="ship-color-demo" style={{ backgroundColor: "#96CEB4" }}></div>
                <strong>Submarine</strong>
                <br />
                Size: 3 cells
              </div>
              <div className="ship-item" style={{ borderLeft: "4px solid #FFEAA7" }}>
                <div className="ship-color-demo" style={{ backgroundColor: "#FFEAA7" }}></div>
                <strong>Cruiser</strong>
                <br />
                Size: 3 cells
              </div>
              <div className="ship-item" style={{ borderLeft: "4px solid #DDA0DD" }}>
                <div className="ship-color-demo" style={{ backgroundColor: "#DDA0DD" }}></div>
                <strong>Patrol Boat</strong>
                <br />
                Size: 2 cells
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
            <div className="grid-symbols-list">
              <div className="symbol-item">
                <div className="color-box" style={{ backgroundColor: "rgba(59, 224, 254, 0.2)", border: "1px solid rgba(255, 255, 255, 0.3)" }}></div>
                <div>
                  <strong>🔵 Blue/Cyan cell</strong>
                  <br />
                  <span className="symbol-desc">Empty water, not attacked yet</span>
                </div>
              </div>
              <div className="symbol-item">
                <div className="color-box" style={{ backgroundColor: "#000000" }}></div>
                <div>
                  <strong>⚫ Black cell</strong>
                  <br />
                  <span className="symbol-desc">Your ship (only visible on your grid)</span>
                </div>
              </div>
              <div className="symbol-item">
                <div className="color-box" style={{ backgroundColor: "rgba(255, 69, 0, 0.6)", border: "1px solid rgba(255, 69, 0, 0.8)" }}>
                  <span style={{ fontSize: "20px" }}>🔥</span>
                </div>
                <div>
                  <strong>🔥 Fire icon</strong>
                  <br />
                  <span className="symbol-desc">Hit! You or the bot hit a ship</span>
                </div>
              </div>
              <div className="symbol-item">
                <div className="color-box" style={{ backgroundColor: "rgba(192, 192, 192, 0.4)", border: "1px solid rgba(192, 192, 192, 0.6)" }}>
                  <span style={{ fontSize: "20px" }}>💧</span>
                </div>
                <div>
                  <strong>💧 Water drop</strong>
                  <br />
                  <span className="symbol-desc">Miss! The attack didn't hit anything</span>
                </div>
              </div>
              <div className="symbol-item">
                <div className="color-box" style={{ backgroundColor: "#FF6B6B" }}></div>
                <div>
                  <strong>🚢 Colored cell</strong>
                  <br />
                  <span className="symbol-desc">Sunk ship (shows ship's color when fully sunk)</span>
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
            <div className="ship-list">
              <div className="ship-item" style={{ borderLeft: "4px solid #FF6B6B" }}>
                <div className="ship-color-demo" style={{ backgroundColor: "#FF6B6B" }}></div>
                <strong>حاملة الطائرات</strong>
                <br />
                الحجم: 5 خلايا
              </div>
              <div className="ship-item" style={{ borderLeft: "4px solid #4ECDC4" }}>
                <div className="ship-color-demo" style={{ backgroundColor: "#4ECDC4" }}></div>
                <strong>سفينة حربية</strong>
                <br />
                الحجم: 4 خلايا
              </div>
              <div className="ship-item" style={{ borderLeft: "4px solid #45B7D1" }}>
                <div className="ship-color-demo" style={{ backgroundColor: "#45B7D1" }}></div>
                <strong>مدمرة</strong>
                <br />
                الحجم: 4 خلايا
              </div>
              <div className="ship-item" style={{ borderLeft: "4px solid #96CEB4" }}>
                <div className="ship-color-demo" style={{ backgroundColor: "#96CEB4" }}></div>
                <strong>غواصة</strong>
                <br />
                الحجم: 3 خلايا
              </div>
              <div className="ship-item" style={{ borderLeft: "4px solid #FFEAA7" }}>
                <div className="ship-color-demo" style={{ backgroundColor: "#FFEAA7" }}></div>
                <strong>طراد</strong>
                <br />
                الحجم: 3 خلايا
              </div>
              <div className="ship-item" style={{ borderLeft: "4px solid #DDA0DD" }}>
                <div className="ship-color-demo" style={{ backgroundColor: "#DDA0DD" }}></div>
                <strong>زورق دورية</strong>
                <br />
                الحجم: 2 خلايا
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
            <div className="grid-symbols-list">
              <div className="symbol-item">
                <div className="color-box" style={{ backgroundColor: "rgba(59, 224, 254, 0.2)", border: "1px solid rgba(255, 255, 255, 0.3)" }}></div>
                <div>
                  <strong>🔵 خلية زرقاء/سيان</strong>
                  <br />
                  <span className="symbol-desc">ماء فارغ، لم يتم مهاجمته بعد</span>
                </div>
              </div>
              <div className="symbol-item">
                <div className="color-box" style={{ backgroundColor: "#000000" }}></div>
                <div>
                  <strong>⚫ خلية سوداء</strong>
                  <br />
                  <span className="symbol-desc">سفينتك (مرئية فقط على شبكتك)</span>
                </div>
              </div>
              <div className="symbol-item">
                <div className="color-box" style={{ backgroundColor: "rgba(255, 69, 0, 0.6)", border: "1px solid rgba(255, 69, 0, 0.8)" }}>
                  <span style={{ fontSize: "20px" }}>🔥</span>
                </div>
                <div>
                  <strong>🔥 أيقونة نار</strong>
                  <br />
                  <span className="symbol-desc">إصابة! أنت أو الروبوت أصبت سفينة</span>
                </div>
              </div>
              <div className="symbol-item">
                <div className="color-box" style={{ backgroundColor: "rgba(192, 192, 192, 0.4)", border: "1px solid rgba(192, 192, 192, 0.6)" }}>
                  <span style={{ fontSize: "20px" }}>💧</span>
                </div>
                <div>
                  <strong>💧 قطرة ماء</strong>
                  <br />
                  <span className="symbol-desc">إخطاء! الهجوم لم يصب شيئاً</span>
                </div>
              </div>
              <div className="symbol-item">
                <div className="color-box" style={{ backgroundColor: "#FF6B6B" }}></div>
                <div>
                  <strong>🚢 خلية ملونة</strong>
                  <br />
                  <span className="symbol-desc">سفينة غارقة (يظهر لون السفينة عند الغرق الكامل)</span>
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
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <div className="modal-header">
          <h5 className="modal-title">{langData.title}</h5>
          <div className="language-selector">
            <button
              className={`language-btn ${language === "en" ? "active" : ""}`}
              onClick={() => setLanguage("en")}
            >
              English
            </button>
            <button
              className={`language-btn ${language === "ar" ? "active" : ""}`}
              onClick={() => setLanguage("ar")}
            >
              العربية
            </button>
          </div>
          <button className="btn-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className="modal-body">
          <div className="carousel-container">
            <div className="carousel-slide">
              <h4>{langData.slides[currentSlide].title}</h4>
              {langData.slides[currentSlide].content}
            </div>
            <div className="carousel-indicators">
              {langData.slides.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${currentSlide === index ? "active" : ""}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
            <button
              className="carousel-control prev"
              onClick={prevSlide}
              disabled={currentSlide === 0}
            >
              ‹
            </button>
            <button
              className="carousel-control next"
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1}
            >
              ›
            </button>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            {langData.close}
          </button>
        </div>
      </div>
    </div>
  );
}

export default GuideModal;
