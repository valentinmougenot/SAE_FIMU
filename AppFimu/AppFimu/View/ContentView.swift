//
//  ContentView.swift
//  AppFimu
//
//  Created by valentin mougenot on 19/01/2023.
//

import SwiftUI

struct ContentView: View {
    
    @State var selection = 0
    @State var showMenu = false
        
    @EnvironmentObject var artistViewModel: ArtistViewModel
    @EnvironmentObject var newViewModel: NewViewModel
    @EnvironmentObject var standViewModel: StandViewModel
    @EnvironmentObject var sceneViewModel: SceneViewModel
    @EnvironmentObject var dateViewModel: DateViewModel
    @EnvironmentObject var concertViewModel: ConcertViewModel
    @EnvironmentObject var countryViewModel: CountryViewModel
    @EnvironmentObject var categoryViewModel: CategoryViewModel
    @EnvironmentObject var genreViewModel: GenreViewModel
    
    var body: some View {
        TabView(selection: $selection) {
            NewsList()
                .tabItem {
                    Label("News", systemImage: "newspaper")
                        .environment(\.symbolVariants, .none)
                }.tag(0)
                .environmentObject(newViewModel)
            FullPlanView()
                .tabItem {
                    Label("Planning", systemImage: "calendar")
                }.tag(1)
                .environmentObject(sceneViewModel)
                .environmentObject(concertViewModel)
                .environmentObject(dateViewModel)
            ArtistList()
                .tabItem {
                    Label("Artistes", systemImage: "music.mic")
                }.tag(2)
                .environmentObject(artistViewModel)
                .environmentObject(countryViewModel)
                .environmentObject(categoryViewModel)
                .environmentObject(genreViewModel)
                .environmentObject(dateViewModel)
            MapView()
                .ignoresSafeArea(edges: .top)
                .tabItem {
                    Label("Carte", systemImage: "map")
                        .environment(\.symbolVariants, .none)
                }.tag(3)
                .environmentObject(standViewModel)
                .environmentObject(sceneViewModel)
        }
        .task {
            await artistViewModel.getArtistes()
            await newViewModel.getNews()
            await standViewModel.getStands()
            await sceneViewModel.getScenes()
            await dateViewModel.getDates()
            await concertViewModel.getConcerts()
            await countryViewModel.getPays()
            await categoryViewModel.getCategorie()
            await genreViewModel.getGenre()
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
