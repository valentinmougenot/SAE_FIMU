//
//  ArtistList.swift
//  AppFimu
//
//  Created by simon nicod on 19/01/2023.
//

import SwiftUI

struct NewsList: View {
    @State var selectedFilter: Int = 0
    @EnvironmentObject var data: NewViewModel
    
    var filteredNews: [News] {
        switch selectedFilter {
        case 0:
            return data.news.sorted(by: { $0.dateEnvoi.lowercased() > $1.dateEnvoi.lowercased() })
        case 1:
            return data.news.sorted(by: { $0.titre.lowercased() < $1.titre.lowercased() })
        case 2:
            return data.news.sorted { $0.typeactu.id > $1.typeactu.id }
        default:
            return data.news
        }
    }

    var body: some View {
        NavigationView {
            List(filteredNews, id: \.id) { new in
                NavigationLink(destination: NewsDetail(new: new).environmentObject(data)) {
                    NewsRow(news: new)
                }
            }
            .listStyle(.inset)
            .navigationTitle("Annonces")
            .toolbar {
                
                ToolbarItem(placement: .principal) {
                    Picker("Filter", selection: $selectedFilter) {
                        Text("Par date").tag(0)
                        Text("Par titre").tag(1)
                        Text("Par type").tag(2)
                    }
                    .pickerStyle(.segmented)
                    .padding(.horizontal)
                }
            }
        }
    }
}

struct NewsList_Previews: PreviewProvider {
    static var previews: some View {
        NewsList()
            .environmentObject(NewViewModel())
    }
}
