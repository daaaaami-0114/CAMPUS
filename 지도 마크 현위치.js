function initMap() {
  // 1. 지도가 처음 열릴 때 보여줄 중심 위치 (한양대 ERICA 정문 부근)
  const schoolCenter = { lat: 37.2975, lng: 126.8375 };

  // 2. 지도 생성
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16,
    center: schoolCenter,
  });

  // 3. 제휴 업체 목록
  const stores = [
    {
      name: "제휴 맛집 A",
      lat: 37.2980,
      lng: 126.8380,
      benefit: "학생증 제시 시 음료 1잔 무료"
    },
    {
      name: "제휴 카페 B",
      lat: 37.2970,
      lng: 126.8365,
      benefit: "아메리카노 500원 할인"
    }
  ];

  // 4. 제휴 업체 핀(마커) 꽂기
  stores.forEach((store) => {
    const marker = new google.maps.Marker({
      position: { lat: store.lat, lng: store.lng },
      map: map,
      title: store.name,
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div style="padding:5px;">
          <h3 style="margin:0 0 5px 0;">${store.name}</h3>
          <p style="margin:0;">혜택: ${store.benefit}</p>
        </div>
      `,
    });

    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });
  }); // <-- 여기서 stores.forEach가 완전히 끝납니다!

  // 5. 접속자 실시간 현위치 표시 기능 (forEach 바깥쪽에 위치!)
  if (navigator.geolocation) {
    let userMarker = new google.maps.Marker({
      map: map,
      title: "내 현재 위치",
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: "#4285F4",
        fillOpacity: 1,
        strokeColor: "#ffffff",
        strokeWeight: 2,
      },
    });

    navigator.geolocation.watchPosition(
      (position) => {
        const currentPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        userMarker.setPosition(currentPos);
      },
      (error) => {
        console.warn("위치 정보를 가져올 수 없습니다:", error);
      },
      {
        enableHighAccuracy: true,
      }
    );
  }
}
