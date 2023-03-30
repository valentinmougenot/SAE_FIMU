//
//  NewsRow.swift
//  AppFImu
//
//  Created by jobst gaetan on 26/01/2023.
//

import SwiftUI

struct NewsRow: View {
    var news: News
    
    var body: some View {
        HStack{
            
            VStack(alignment: .leading) {
                
                HStack {
                    Image(systemName: news.typeactu.libelle == "Information" ? "exclamationmark.circle.fill" : (news.typeactu.libelle == "Avertissement" ? "exclamationmark.triangle.fill" : "exclamationmark.octagon.fill"))
                        .foregroundColor(news.typeactu.libelle == "Information" ? .blue : (news.typeactu.libelle == "Avertissement" ? .yellow : .red))
                    Text(news.titre)
                        .font(.title2)
                        .bold()
                }

                Text(news.contenu)
                    .font(.title3)
                
            }
            .padding(.vertical, 5)
            
            Spacer()

            news.imageIcon
            
        }
        .frame(height: 100)
    }
}

//struct NewsRow_Previews: PreviewProvider {
//    static var news = ModelData().news
//    static var previews: some View {
//        NewsRow(news: news[0])
//    }
//}
