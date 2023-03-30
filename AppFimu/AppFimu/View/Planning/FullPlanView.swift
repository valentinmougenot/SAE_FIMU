//
//  FullPlanView.swift
//  FimuApp
//
//  Created by user234247 on 3/8/23.
//

import SwiftUI

struct FullPlanView: View {
    @State private var selectedDateIndex = 0
    @State private var selectedTab = 0
    @EnvironmentObject var dataScenes: SceneViewModel
    @EnvironmentObject var dataDates: DateViewModel

    var body: some View {
        NavigationView {
            VStack {
                Picker(selection: $selectedDateIndex, label: Text("Date")) {
                    ForEach(0..<dataDates.dates.count, id: \.self) { index in
                        Text(dataDates.dates[index].date_debut)
                    }
                }
                .pickerStyle(SegmentedPickerStyle())
                .padding()

                GeometryReader { geometry in
                    ScrollView(.horizontal) {
                        VStack(alignment: .leading) {
                            TimelineView(startHour: 14, endHour: 24)
                            ForEach(dataScenes.scenes) { scene in
                                PlanningView(planning: Planning(scene: scene, dateDebut: dataDates.dates[selectedDateIndex].date_debut, hStart: "14:00"))
                            }
                        }
                    }
                }
            }
            .navigationTitle("Programmation")
            .navigationBarTitleDisplayMode(.inline)
        }
    }
}

struct FullPlanView_Previews: PreviewProvider {
    static var previews: some View {
        FullPlanView()
    }
}
