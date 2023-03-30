//
//  NewsDetail.swift
//  AppFImu
//
//  Created by user226878 on 1/26/23.
//

import SwiftUI

struct NewsDetail: View {
    var new: News
    
    var body: some View {
        ScrollView  {
            VStack  (alignment: .leading) {
                new.image
                Text(new.titre)
                    .font(.title)
                    .bold()
                    .padding(.bottom, 10)
                    .foregroundColor(new.typeactu.couleurFInal)
                    .frame(minWidth: 0, maxWidth: .infinity, minHeight: 0, maxHeight: .infinity, alignment: .center)
                Text(new.contenu)
                    .padding(.top, 20)
            }
            .padding()
        }
        .navigationTitle(new.titre)
        .navigationBarTitleDisplayMode(.inline)
    }
}

/*struct NewsDetail_Previews: PreviewProvider {
    static let modelData = ModelData()
    static var previews: some View {
        NewsDetail(new: modelData.news[2])
            .environmentObject(modelData)
    }
}*/
