//
//  TimeLineView.swift
//  AppFimu
//
//  Created by valentin mougenot on 30/03/2023.
//

import SwiftUI

struct TimelineView: View {
    let startHour: Int
    let endHour: Int

    var body: some View {
        HStack {
            ForEach(startHour..<endHour) { hour in
                Text("\(hour):00")
                    .bold()
                    .frame(width: 120)
            }
        }
    }
}

struct TimelineView_Previews: PreviewProvider {
    static var previews: some View {
        TimelineView(startHour: 14, endHour: 24)
    }
}

