//
//  PlanningView.swift
//  FimuApp
//
//  Created by user234247 on 3/8/23.
//

import SwiftUI

struct PlanningView: View {
    var planning: Planning
    @EnvironmentObject var dataConcert: ConcertViewModel
    
    var concertOnAScene: [Concert] {
        dataConcert.concerts.filter { concert in
            if concert.scene.id == planning.scene.id {
                if concert.date_debut == planning.dateDebut {
                    if concert.heure_debut >= planning.hStart {
                        return true
                    }
                }
            }
            return false
        }.sorted { (c1, c2) -> Bool in
            return c1.heure_debut < c2.heure_debut
        }
    }


    var body: some View {
        HStack {
            VStack {
                Text(planning.scene.libelle)
                    .foregroundColor(.white)
                    .frame(width: 100, height: 30)
                    .background(.black)
                    .rotationEffect(.degrees(-90))
                    .padding(.leading, -20)
                    .padding(.trailing, -27)
            }
            HStack(alignment: .top) {
                Spacer()
                    .frame(width: 100)
                ForEach(concertOnAScene) { concert in
                    Spacer()
                        .frame(width: calculateSpacing(concertStartTime: concert.heure_debut, sceneStartTime: planning.hStart))
                    ConcertRow(concert: concert)
                }
            }
        }
        .frame(height: 100)
    }
    
    private func calculateSpacing(concertStartTime: String, sceneStartTime: String) -> CGFloat {
        let concertStartMinutes = timeToMinutes(concertStartTime)
        let sceneStartMinutes = timeToMinutes(sceneStartTime)

        let spacing = CGFloat((concertStartMinutes - sceneStartMinutes) * 2)
        return max(0, spacing)
    }

    private func timeToMinutes(_ time: String) -> Int {
        let components = time.split(separator: ":")
        let hours = Int(components[0]) ?? 0
        let minutes = components.count > 1 ? Int(components[1]) ?? 0 : 0
        return hours * 60 + minutes
    }
    
}

/*struct PlanningView_Previews: PreviewProvider {
    static var previews: some View {
        PlanningView(planning: Planning(scene: Scenes(id: 1,libelle: "Jazz", jauge: 0, latitude:55.1, longitude: 55.1, type: TypeScene(id: 1,libelle: "Extérieur")), dateDebut: "2024-03-12", hStart: "14:00:00"))
            .environmentObject(ConcertViewModel())
    }
}*/
